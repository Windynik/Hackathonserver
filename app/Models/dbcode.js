const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var codeData = new Schema({


    user_id: {
        type: String,
        required: true
    },
    code: {
        type: String,
        require: true
    },
    lang_id:{
        type:Number,
        require: true
    },
    book_id:{
        type:String,
        require:true
    }
}, {
    versionKey : false
});

codeModel = mongoose.model('Code', codeData)
module.exports = codeModel;