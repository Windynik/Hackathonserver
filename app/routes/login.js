const express = require('express');
const router = express.Router();
var utils = require("../utils.js")
const {
    userModel
} = require('../Models/index.js');

const {
    check,
    validationResult
} = require('express-validator/check');

router.post('/', [
    check('email').isEmail().withMessage("It should technically be a email"),
    check('name').isLength({
        min: 1
    }).withMessage("The name should exist m8")
],async (req, res) =>  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(500).json({
        //     errors: errors.array()
        // });
        err = errors;
        success = false;
        data = null;
        return res.json(utils.kek(success, err, data));
    }
    let user = await userModel.findOne({
        email: req.body.email
    });
    if(!user) {
        userModel.create({
                    email: req.body.email,
                    name: req.body.name
            
                }).then(user => {
            
                    success = true;
                    err = null;
                    data = user;
                    console.log("A user has been created under the name of : ", user.name);
                    return res.json(utils.kek(success, err, data));
            
                    
                })
            
            
                .catch(error => {
                    err = 800;
                    success = false;
                    data = null;
                    res.json(utils.kek(success, err, data))
                    console.log("You dun goofed");
                });
            }
            else {
                return res.json(utils.kek(true, null, {
                    user
                }))
            }

});


// if (userModel.findOne({          //i fucked up ;_; 
//     email: req.body.email
// }, ( (err, dat) => {
//     if (err) {
//         return false
//     };
//     if (!dat) {
//         return res.json(utils.kek(false, 'sux', data));
//     }
//     success = true;
//     err = null;
//     data = dat;
//     console.log("its fuckgin up here");
//     res.json(utils.kek(success, err, data));
// }))) {

// } else {
// userModel.create({

//         email: req.body.email,
//         name: req.body.name

//     }).then(user => {

//         success = true;
//         err = null;
//         data = user;
//         res.json(utils.kek(success, err, data));

//         console.log("A user has been created under the name of : ", user.name);
//     })


//     .catch(error => {
//         err = error;
//         success = false;
//         data = null;
//         res.json(utils.kek(success, err, data))
//         console.log("You dun goofed");
//     });
// }

module.exports = router;