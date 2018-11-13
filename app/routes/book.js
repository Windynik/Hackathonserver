const express = require('express');
const router = express.Router();
var utils = require("../utils.js")
var faker=require('faker')

const {
    codeModel
} = require('../Models/index.js');
const {
    check,
    validationResult
} = require('express-validator/check');


router.get('/test', (req, res) => {
    res.send("Well book works");
});
router.post('/kek', async (req, res) => {
    let code = await codeModel.find({
        user_id: req.body.user_id
    })  

    if(code.length===0) {
        success = false;
        err = 1001;
        data = null;
        res.json(utils.kek(success, err, data));}
    else {
        success = true;
        err = null;
        data = code;
        res.json(utils.kek(success, err, data));}
    
})

router.post('/', [
    check('user_id').isLength({
        min: 1
    }).withMessage("The user_id should exist m8"),
    check('code').isLength({
        min: 1
    }).withMessage("The code should exist m8"),
    check('lang_id').isLength({
        min: 1
    }).withMessage("The lang_id should exist m8")
], (req, res) => {
    codeModel.create({

            user_id: req.body.user_id,
            code: req.body.code,
            lang_id: req.body.lang_id,
            book_id:faker.fake("{{company.catchPhraseDescriptor}}")+faker.fake("{{commerce.productMaterial}}")+faker.fake("{{commerce.product}}")
            
        }).then(code => {
            console.log(req.body)
            success = true;
            err = null;
            data = code;
            res.json(utils.kek(success, err, data));

            console.log("A user under the id of", data.user_id, "has created a bookmark of code.");
        })
        .catch(error => {
            err = 1000;
            success = false;
            data = null;
            res.json(utils.kek(success, err, data))
            console.log(error)
            console.log("You dun goofed");
        });

})
module.exports = router;