const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  closeJob,
  getCompanyJobs
} = require('../controllers/jobController');
const { protect, restrictTo } = require('../middleware/auth');

// Public routes
router.get('/', getJobs);
router.get('/:id', getJobById);

// Company only routes
router.post('/', protect, restrictTo('COMPANY'), createJob);
router.put('/:id', protect, restrictTo('COMPANY'), updateJob);
router.patch('/:id/close', protect, restrictTo('COMPANY'), closeJob);
router.get('/company/myjobs', protect, restrictTo('COMPANY'), getCompanyJobs);

module.exports = router;