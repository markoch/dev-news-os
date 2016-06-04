'use strict';

var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var PodcastSchema = new Schema({
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
    publisher: {
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
    publisherURL: {
        type:String,
        required: true
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
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Podcast', PodcastSchema);
