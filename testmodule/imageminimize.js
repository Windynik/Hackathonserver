const express = require('express');
var base64Img = require('base64-img');
var Jimp = require('jimp');
var base64ToImage = require('base64-to-image');

function redution() {
    var rand = Math.floor(Math.random * 1000);
    var file="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";
        console.log("top kek??");
        var base64Str = file;
        var path ='../img/';
        var optionalObj = {'fileName': 'fuck', 'type':'png'};

    base64ToImage(base64Str,path,optionalObj); 
    console.log(lel)
// Note base64ToImage function returns imageInfo which is an object with imageType and fileName.
// var imageInfo = base64ToImage(base64Str,path,optionalObj);
    console.log("top kek");
    // Jimp.read(path, (err, kek) => {
    //     if (err) throw err;
    //     kek
    //         .resize(256, 256) // resize
    //         .quality(60) // set JPEG quality
    //         .greyscale() // set greyscale
    //         .write(`${rand}.jpg`); // save});
    //     //put the code here
    //     var data = base64Img.base64Sync(`${rand}.jpg`);
    //     return data
    // });
}



redution()