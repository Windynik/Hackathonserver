const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userInfo = new Schema({


    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {
    versionKey : false
})


userModel = mongoose.model('User', userInfo)


module.exports = userModel;