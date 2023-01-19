const mongoose = require('mongoose');

const snapshotSchema = new mongoose.Schema({
    timestamp: {
        type: String,
    },
    score: {
        type: Number,
    }
});

const scoreSchema = new mongoose.Schema({
    projectAddress: {
        type: String,
        require: true
    },
    scoreHistory: [snapshotSchema], //keeping track of score history
    currentScore: {
        type: Number,
        default: 0
    }
});

const holderSchema = new mongoose.Schema({
    privyId: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true,
        default: 'Random Holder'
    },
    twitterUsername: {
        type: String,
        required: true,
    },
    twitterURL: {
        type: String,
        default: ''
    },
    pfpURL: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    discord: {
        type: String,
        default: ''
    },
    wallet: {
        type: String,
        default: ''
    },
    scores: [scoreSchema]
});


mongoose.model('Holder', holderSchema);