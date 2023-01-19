const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    twitterId: {
        type: String,
    },
    discordId: {
        type: String,
    },
    wallet: {
        type: String,
    },
});

const questSchema = new mongoose.Schema({
    projectAddress: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: "New Quest"
    },
    description: {
        type: String,
        default: "No description"
    },
    tweetId: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    start: {
        type: String,
    },
    end: {
        type: String,
    },
    participants: [participantSchema]
});


mongoose.model('Quest', questSchema);