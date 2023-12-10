// 27. videoda buradan devam etti 

const express=require('express')

const {signupKullanici,loginKullanici}=require('../controllers/kullaniciController')

const router=express.Router();

router.post('/login',loginKullanici)


router.post('/signup',signupKullanici)

module.exports=router