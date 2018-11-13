const express = require('express');
const router = express.Router();
const vision = require('@google-cloud/vision')
var utils = require("../utils.js")
const pyurl = 'http://192.168.10.94:5000/predict'
var base64Img = require('base64-img');
var Jimp = require('jimp');
const axios = require('axios')
const qs = require('querystring')


const {
    check,
    validationResult
} = require('express-validator/check');

reduction = (baseimg) => {
    var rand = Math.floor(Math.random * 1000);
    var file;
    base64Img.img('data:image/png;base64,baseimg', '../img/', rand, function (err, filepath) {
        if (err) {
            return baseimg;
        }
        file = filepath;
    });
    Jimp.read(path, (err, kek) => {
        if (err) throw err;
        kek
            .resize(256, 256) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
            .write(`${rand}.jpg`); // save});
        //put the code here
        var data = base64Img.base64Sync(`${rand}.jpg`);
    });
}

router.get('/test', (req, res) => {
    res.send("Well detect works");
});

router.post('/', [
    check('img').isLength({
        min: 1
    }).withMessage("The img should exist m8"),
    check('user_id').isLength({
        min: 1
    }).withMessage("The user_id should exist m8")
], (req, res) => {
    img = req.body.img;
    //img = reduction(img1);
    const client = new vision.ImageAnnotatorClient();
    client.textDetection({
            image: {
                content: Buffer.from(img, 'base64')
            }
        }, )
        .then(results => {
            console.log("An image has been decoded by the user with the ID : ", req.body.user_id);
            const detections = results[0].textAnnotations;
            // var options = {
            //     uri: pyurl,
            //     method: 'POST',
            //     form: {
            //         code: `${detections[0].description}`
            //     }
            // };
            axios.post(pyurl, qs.stringify({
                    code: `${detections[0].description}`
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then((resx) => {
                    console.log(resx.data);
                    console.log(`${detections[0].description}`);
                    var lang_id = resx.data.lang_code;
                    console.log(utils.kek(true, null, {
                        code: `${detections[0].description}`,
                        lang_id
                    }));
                    res.send(utils.kek(true, null, {
                        code: `${detections[0].description}`,
                        lang_id
                    }, ));
                })
                .catch(e => console.log(e))
            console.log("We reached here");

        })
        .catch(err => {
            res.send(utils.kek(false, 700, null));
        });
})



// router.post('./retry',(req,res)=>{

//     axios.post(pyurl, qs.stringify({
//         code: `${detections[0].description}`
//     }), {
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     })
//     .then((resx) => {
//         console.log(resx.data);
//         console.log(`${detections[0].description}`);
//         var lang_id = resx.data.lang_code;
//         console.log(utils.kek(true, null, {
//             code: `${detections[0].description}`,
//             lang_id
//         }));
//         res.send(utils.kek(true, null, {
//             code: `${detections[0].description}`,
//             lang_id
//         }, ));
//     })
//     .catch(e => console.log(e))
// console.log("We reached here");

// })
// .catch(err => {
// res.send(utils.kek(false, 700, null));
// })
module.exports = router;