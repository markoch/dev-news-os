'use strict';

var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var ArticleSchema = new Schema({
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
        required: true,
        unique: true
    },
    tags: {
        type:String,
        default: ''
    },
    counter: {
        type:Number,
        default: 1
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
    },
    isValid: {
        type:Boolean,
        default: false
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Article', ArticleSchema);
