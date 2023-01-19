const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const holderSchema = new mongoose.Schema({
    holderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Holder"
    }
});

//how project wants to call the points in leaderboard
const tokenSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "points"
    },
    ticker: {
        type: String,
        default: ""
    },
});

//reference to quest model
const questSchema = new mongoose.Schema({
    questId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quest"
    },
});

//style is used to customize the npm package
const styleSchema = new mongoose.Schema({
    width: {
        type: String,
        default: "30rem"
    },
    height: {
        type: String,
        default: "50rem"
    },
    borderRadius: {
        type: String,
        default: "10px"
    },
    backgroundColor: {
        type: String,
        default: "white"
    },
    color: {
        type: String,
        default: "black"
    },
    border: {
        type: String,
        default: "1px solid white"
    },
    logoURI: {
        type: String,
        default: ""
    }
});

//metrics are used to calculate the score
const metricsWeightSchema = new mongoose.Schema({
    ERC721Balance: {
        type: Number,
        default: 10
    },
    ERC721Transactions: {
        type: Number,
        default: 1
    },
    ERC20Balance: {
        type: Number,
        default: 1
    },
    ERC20Transactions: {
        type: Number,
        default: 1
    },
    twitterReplies: {
        type: Number,
        default: 2
    },
    twitterMentions: {
        type: Number,
        default: 2
    },
    twitterRetweets: {
        type: Number,
        default: 5
    },
    twitterLikes: {
        type: Number,
        default: 1
    },
});


const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    projectAddress: {
        type: String,
        unique: true,
        required: true
    },
    ERC20Address: {
        type: String,
    },
    discord: {
        type: String,
        default: ''
    },
    twitter: {
        type: String,
        default: ''
    },
    key: {
        type: String,
        required: true,
        unique: true
    },
    token: tokenSchema,
    metricsWeight: metricsWeightSchema,
    holders: [holderSchema],
    style: styleSchema,
    quests: [questSchema]
});

projectSchema.pre('save', function(next){
    const project = this;

    if(!project.isModified('password')){
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {

        if (err){
            return next(err);
        }

        bcrypt.hash(project.password, salt, (err, hash) => {

            if (err){
                return next(err);
            }

            project.password = hash;
            next();
        })
    })
})

projectSchema.methods.comparePassword = function(candidatePassword) {
    const project = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, project.password, (err, isMatch) => {

            if (err){
                return reject(err);
            }
            if (!isMatch){
                return reject(false);
            }

            resolve(true);
        });
    })
}

projectSchema.methods.compareApiKey = function(candidateKey) {
    const project = this;
    return new Promise((resolve, reject) => {
        if (candidateKey === project.key) {
            resolve(true);
        } else {
            return reject('Key does not match');
        }
    })
}

mongoose.model('Project', projectSchema);