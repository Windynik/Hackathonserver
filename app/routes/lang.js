
const pyurl = 'http://192.168.10.94:5000/predict'
const express = require('express');
const router = express.Router();
const axios = require('axios')
var utils = require("../utils.js")
const qs = require('querystring')


router.get('/test', (req, res) => {
    res.send("Well lang works");
});


router.post('/',(req,res)=>{


axios.post(pyurl, qs.stringify({
    code: req.body.code
}), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
        .then((resx) => {
            var lang_id = resx.data.lang_code;
            console.log(utils.kek(true, null, {
                lang_id
            }));
            console.log(req.body);
            
            res.send(utils.kek(true, null, {
                lang_id
            }, ));
        })
        .catch(e => console.log(e))
    console.log("We reached here");

})

module.exports=router;