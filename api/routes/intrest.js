const express = require('express');
const router = express.Router();
const {interest } = require('../controllers/intrestController');
const { protect } = require('../middleware/authMiddleware');


router.route("/intrest").post(protect, interest);


module.exports = router;