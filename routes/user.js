const express = require('express');
const router = express.Router();
const Product = require('../models/Products')
const Admin = require('../models/admin');
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');

router.get('/', (req, res)=> {
    var suc = req.flash('success');
    var dan = req.flash('danger');
    res.render('index',{danger:dan,success:suc});
});
router.get('/login',(req,res)=>{
    res.render('login',{danger:req.flash('error')});
});
router.post('/login',passport.authenticate('local.signin',{
    successRedirect: '/',
    failureRedirect: '/admin/login',
    failureFlash: true
}));
router.post('/changepassword',(req,res,next)=>{
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    if(!confirmPassword === newPassword) {
        req.flash('danger','Password Not Matching');
        res.redirect('/admin/changepassword');
    }else {
        Admin.findOne({username:'administrator'},(err,user)=>{
            if(err){
                req.flash('danger','Something Went Wrong');
            }else {
                if(bcrypt.compareSync(oldPassword,user.password)){
                    user.password = user.encryptPassword(newPassword);
                    user.save((err)=>{
                        if(!err){
                            req.flash('success','Password Changed Successfully!!');

                        }
                        req.flash('danger','Something Went Wrong');

                    });
                }else {
                    req.flash('danger','Old Password Is Incorrect');
                }
            }
        });
    }
    return res.redirect('/admin/changepassword');

});
router.get('/changepassword',(req,res)=>{
    res.render('change_password',{danger:req.flash('danger'),success:req.flash('success')});
});
router.get('/logout',isLoggedIn,(req,res)=>{
    req.logout();
    res.redirect('/');
});
isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/admin/login');
};
module.exports = router;