const express = require('express');
const router = express.Router();
var utils = require("../utils.js")


router.post('/',async(req,res)=>{
        
        let code = await codeModel.find({
            book_id:req.body.book_id
        })  
        if(code.length===0) {
            success = false;
            err = 666;
            data = null;
            console.log(utils.kek(success, err, data))
            res.json(utils.kek(success, err, data));}
        else {
            success = true;
            err = null;
            data = code[0];
            console.log(utils.kek(success, err, data))
            res.json(utils.kek(success, err, data));}
        
})

module.exports=  router;
