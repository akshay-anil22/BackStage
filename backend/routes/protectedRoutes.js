const express = require('express')
const router = express.Router();

const protect = require('../middleware/authMiddleware');  
const {changePassword , promoteToOrganizer} = require('../controllers/authController');

router.get('/dashboard',protect, (req,res) =>{
  res.status(200).json({
    message: 'Welocome to dashboard',
    user: req.user,
  });
});

router.post('/change-password',protect,changePassword);
router.post('/promote',protect, promoteToOrganizer);

module.exports=router;
