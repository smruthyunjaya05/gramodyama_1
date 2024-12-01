const router = require('express').Router();
const auth = require('../middleware/auth');
const { 
  getSchemes, 
  createScheme 
} = require('../controllers/schemeController');

// Get all schemes
router.get('/', getSchemes);

// Create new scheme (protected route)
router.post('/', auth, createScheme);

module.exports = router; 