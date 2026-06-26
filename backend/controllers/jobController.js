const prisma = require('../prismaClient');

// Get all active jobs (with optional filters)
const getJobs = async (req, res) => {
  try {
    const { 
      workMode, 
      opportunityType, 
      search,
      status 
    } = req.query;

    const where = {
      status: status || 'active'
    };

    if (workMode) where.workMode = workMode;
    if (opportunityType) where.opportunityType = opportunityType;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const jobs = await prisma.jobListing.findMany({
      where,
      include: {
        company: {
          select: {
            companyName: true,
            city: true,
            isVerified: true,
            logoUrl: true,
            industry: true
          }
        },
        _count: {
          select: { applications: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ jobs, total: jobs.length });

  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single job by ID
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.jobListing.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            companyName: true,
            city: true,
            isVerified: true,
            logoUrl: true,
            industry: true,
            size: true,
            website: true,
            description: true
          }
        },
        _count: {
          select: { applications: true }
        }
      }
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ job });

  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Post a new job (company only)
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requiredSkills,
      experienceLevel,
      workMode,
      opportunityType,
      stipendType,
      duration,
      vacanciesTotal,
      salaryMin,
      salaryMax,
      stipendAmount,
      deadline
    } = req.body;

    if (!title || !description || !workMode || !opportunityType || !vacanciesTotal) {
      return res.status(400).json({ 
        message: 'Title, description, work mode, opportunity type and vacancies are required' 
      });
    }

    // Get company profile
    const companyProfile = await prisma.companyProfile.findUnique({
      where: { userId: req.userId }
    });

    if (!companyProfile) {
      return res.status(404).json({ message: 'Company profile not found' });
    }

    const job = await prisma.jobListing.create({
      data: {
        companyId: companyProfile.id,
        title,
        description,
        requiredSkills: requiredSkills || [],
        experienceLevel,
        workMode,
        opportunityType,
        stipendType,
        duration,
        vacanciesTotal: parseInt(vacanciesTotal),
        vacanciesRemaining: parseInt(vacanciesTotal),
        salaryMin: salaryMin ? parseFloat(salaryMin) : null,
        salaryMax: salaryMax ? parseFloat(salaryMax) : null,
        stipendAmount: stipendAmount ? parseFloat(stipendAmount) : null,
        deadline: deadline ? new Date(deadline) : null,
        status: 'active'
      },
      include: {
        company: {
          select: {
            companyName: true,
            isVerified: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Job posted successfully',
      job
    });

  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update job (company only)
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const companyProfile = await prisma.companyProfile.findUnique({
      where: { userId: req.userId }
    });

    const job = await prisma.jobListing.findUnique({
      where: { id }
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.companyId !== companyProfile.id) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const updatedJob = await prisma.jobListing.update({
      where: { id },
      data: { ...req.body, updatedAt: new Date() }
    });

    res.json({ message: 'Job updated successfully', job: updatedJob });

  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Close a job (company only)
const closeJob = async (req, res) => {
  try {
    const { id } = req.params;

    const companyProfile = await prisma.companyProfile.findUnique({
      where: { userId: req.userId }
    });

    const job = await prisma.jobListing.findUnique({
      where: { id }
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.companyId !== companyProfile.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await prisma.jobListing.update({
      where: { id },
      data: { status: 'closed' }
    });

    res.json({ message: 'Job closed successfully' });

  } catch (error) {
    console.error('Close job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get company's own jobs
const getCompanyJobs = async (req, res) => {
  try {
    const companyProfile = await prisma.companyProfile.findUnique({
      where: { userId: req.userId }
    });

    if (!companyProfile) {
      return res.status(404).json({ message: 'Company profile not found' });
    }

    const jobs = await prisma.jobListing.findMany({
      where: { companyId: companyProfile.id },
      include: {
        _count: {
          select: { applications: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ jobs });

  } catch (error) {
    console.error('Get company jobs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  closeJob,
  getCompanyJobs
};