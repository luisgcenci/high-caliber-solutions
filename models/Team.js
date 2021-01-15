const mongoose = require('mongoose');

const teammateSchema = new mongoose.Schema({

    img: String,
    name: {
        type: String,
        required: true,
        maxLength: 40,
    },

    description:{
        type: String,
        maxLength: 120
    },

    job:{
        type: String,
        required: true,
        maxLength: 40
    },
    
    facebook: String,
    twitter: String,
    linkedin: String
})

const Teammate = mongoose.model('Teammate', teammateSchema);

module.exports = Teammate;


