const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
const multer = require('multer');
var fs = require('fs');
var upload = multer({ dest: 'uploads/' })
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
router.post('/addnew', upload.single('image'),(req,res,next)=>{
    console.log(req.file);
   var product = new Product ({
       title: req.body.title.toLowerCase(),
       content: req.body.content,
       category: req.body.category,
       originalPrice:req.body.originalPrice,
       discountedPrice:req.body.discountedPrice
   });
   product.img.data = fs.readFileSync(req.file.path);
   product.contentType = 'image/png';
   var info,message;
   product.save((err)=>{
       if(!err){
           info = 'success';
           message = "Successfully Added";
           req.flash(info,message);
           res.redirect('/addnew');
       }else {
           info = 'danger';
           message = err.toString();//development
           // message = "Invalid Credentials";//production
           req.flash(info,message);
           res.redirect('/addnew');
       }
   });




});
module.exports = router;