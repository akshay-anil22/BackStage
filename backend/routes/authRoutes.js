const express = require('express')
const router = express.Router();

const {registerUser, loginuser, promoteToOrganizer}= require ('../controllers/authController');



router.post('/register',registerUser);
router.post('/login',loginuser);


module.exports = router;