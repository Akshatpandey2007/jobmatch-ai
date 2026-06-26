const prisma = require('../prismaClient');

// Apply to a job — with concurrent vacancy safety
const applyToJob = async (req, res) => {
  const { jobId } = req.body;

  if (!jobId) {
    return res.status(400).json({ message: 'Job ID is required' });
  }

  try {
    // Get candidate profile
    const candidateProfile = await prisma.candidateProfile.findUnique({
      where: { userId: req.userId }
    });

    if (!candidateProfile) {
      return res.status(404).json({ message: 'Candidate profile not found' });
    }

    // Check if already applied
    const existingApplication = await prisma.application.findUnique({
      where: {
        candidateId_jobId: {
          candidateId: candidateProfile.id,
          jobId
        }
      }
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied to this job' });
    }

    // Use transaction for concurrent safety
    const result = await prisma.$transaction(async (tx) => {
      // Lock and check vacancy
      const job = await tx.jobListing.findUnique({
        where: { id: jobId }
      });

      if (!job) {
        throw new Error('Job not found');
      }

      if (job.status !== 'active') {
        throw new Error('This job is no longer accepting applications');
      }

      if (job.vacanciesRemaining <= 0) {
        throw new Error('No vacancies available for this job');
      }

      // Create application
      const application = await tx.application.create({
        data: {
          candidateId: candidateProfile.id,
          jobId,
          status: 'applied'
        }
      });

      // Decrement vacancy count
      await tx.jobListing.update({
        where: { id: jobId },
        data: {
          vacanciesRemaining: {
            decrement: 1
          },
          version: {
            increment: 1
          }
        }
      });

      return application;
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      application: result
    });

  } catch (error) {
    console.error('Apply to job error:', error);

    if (error.message === 'No vacancies available for this job') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'This job is no longer accepting applications') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Job not found') {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: 'Server error' });
  }
};

// Get candidate's applications
const getMyApplications = async (req, res) => {
  try {
    const candidateProfile = await prisma.candidateProfile.findUnique({
      where: { userId: req.userId }
    });

    if (!candidateProfile) {
      return res.status(404).json({ message: 'Candidate profile not found' });
    }

    const applications = await prisma.application.findMany({
      where: { candidateId: candidateProfile.id },
      include: {
        job: {
          include: {
            company: {
              select: {
                companyName: true,
                isVerified: true,
                logoUrl: true,
                city: true
              }
            }
          }
        }
      },
      orderBy: { appliedAt: 'desc' }
    });

    res.json({ applications });

  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get applicants for a job (company only)
const getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const companyProfile = await prisma.companyProfile.findUnique({
      where: { userId: req.userId }
    });

    const job = await prisma.jobListing.findUnique({
      where: { id: jobId }
    });

    if (!job || job.companyId !== companyProfile.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const applications = await prisma.application.findMany({
      where: { jobId },
      include: {
        candidate: {
          select: {
            fullName: true,
            skills: true,
            domain: true,
            experienceLevel: true,
            resumeUrl: true,
            linkedinUrl: true,
            githubUrl: true,
            profileStrength: true
          }
        }
      },
      orderBy: { appliedAt: 'desc' }
    });

    res.json({ applications });

  } catch (error) {
    console.error('Get applicants error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update application status (company only)
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      'applied',
      'viewed',
      'shortlisted',
      'interview_scheduled',
      'offer_extended',
      'rejected'
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await prisma.application.update({
      where: { id },
      data: { status, updatedAt: new Date() }
    });

    res.json({
      message: 'Application status updated',
      application
    });

  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Withdraw application (candidate only)
const withdrawApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const candidateProfile = await prisma.candidateProfile.findUnique({
      where: { userId: req.userId }
    });

    const application = await prisma.application.findUnique({
      where: { id }
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.candidateId !== candidateProfile.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (!['applied', 'viewed'].includes(application.status)) {
      return res.status(400).json({ 
        message: 'Cannot withdraw application at this stage' 
      });
    }

    // Delete application and restore vacancy
    await prisma.$transaction(async (tx) => {
      await tx.application.delete({ where: { id } });

      await tx.jobListing.update({
        where: { id: application.jobId },
        data: {
          vacanciesRemaining: { increment: 1 },
          version: { increment: 1 }
        }
      });
    });

    res.json({ message: 'Application withdrawn successfully' });

  } catch (error) {
    console.error('Withdraw error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  applyToJob,
  getMyApplications,
  getJobApplicants,
  updateApplicationStatus,
  withdrawApplication
};