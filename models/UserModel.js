const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    contact:{
        type: String,
        required: true
    },
    subjects:{
        type: [String],
        required: true
    },

    class:{
        type: String,
        required: true
    },
    society:{
        type: [String],
        default:[]
    },

    year:{
        type: Number,
    }


})

module.exports = mongoose.model('User', UserSchema)