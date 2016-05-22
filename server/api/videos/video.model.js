'use strict';

var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var VideoSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    author: {
        type:String,
        required: true
    },
    acronym: {
        type:String,
        required: true
    },
    publish: {
        type:String,
        required: true
    },
    summary: {
        type:String,
        default: ''
    },
    content: {
        type:String,
        default: ''
    },
    url: {
        type:String,
        required: true
    },
    dataURL: {
        type:String,
        required: true,
        unique: true
    },
    tags: {
        type:String,
        default: ''
    },
    counter: {
        type:Number,
        default: 0
    },
    likes: {
        type:Number,
        default: 1
    },
    label: {
        type:String,
        default: ''
    },
    image: {
        type:String,
        default: ''
    },
    isHeadline: {
        type:String,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Video', VideoSchema);
