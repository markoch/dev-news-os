'use strict';

var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var MessageSchema = new Schema({
    user: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    subject: {
        type:String,
        required: true
    },
    message: {
        type:String,
        required: true
    },
    done: {
        type:Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);
