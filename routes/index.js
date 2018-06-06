const express = require('express');
const router = express.Router();
const Product = require('../models/Products');

router.use((req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    req.flash('danger','You Need To Log In');
    return res.redirect('/admin/login');
});
router.get('/products',(req,res)=>{
    res.send("Under Construction! not done yet");
});
router.get('/orders',(req,res)=>{
   res.render('orders');
});
router.get('/',(req,res)=> {
    res.render('index');
});
router.get('/addnew',(req,res)=>{
   res.render('advanceaddnew',{danger:req.flash('danger')[0],success:req.flash('success')[0]});
});
router.post('/addnew',(req,res,next)=>{
   var product = new Product ({
       title: req.body.title.toLowerCase(),
       content: req.body.content,
       category: req.body.category,
       originalPrice:req.body.originalPrice,
       discountedPrice:req.body.discountedPrice
   });
   var info,message;
   product.save((err)=>{
       if(!err){
           info = 'success';
           message = "Successfully Added";
           req.flash(info,message);
       }else {
           info = 'danger';
           message = err.toString();
           req.flash(info,message);
       }
   });
    return next(res.redirect('/addnew'));



});

module.exports = router;