const express = require('express');
const router = express.Router();
const {
  applyToJob,
  getMyApplications,
  getJobApplicants,
  updateApplicationStatus,
  withdrawApplication
} = require('../controllers/applicationController');
const { protect, restrictTo } = require('../middleware/auth');

// Candidate routes
router.post('/', protect, restrictTo('CANDIDATE'), applyToJob);
router.get('/my', protect, restrictTo('CANDIDATE'), getMyApplications);
router.delete('/:id', protect, restrictTo('CANDIDATE'), withdrawApplication);

// Company routes
router.get('/job/:jobId', protect, restrictTo('COMPANY'), getJobApplicants);
router.patch('/:id/status', protect, restrictTo('COMPANY'), updateApplicationStatus);

module.exports = router;