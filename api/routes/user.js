const express = require('express');
const router = express.Router();
const {signup, authUser,profile,interest,likes,report ,userdata} = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');
// const { upload } = require('../helper/filehelper');



router.route("/signup").post(signup);
router.route("/login").post(authUser);
router.route("/basicprofile").post( protect, profile);
router.route("/intrest").post(protect,interest);
router.route("/like").put(protect, likes);
router.route("/reportuser").put(protect, report);

router.route("/userdata").get(protect, userdata);

module.exports = router;