const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({

    img: String,
    name: {
        type: String,
        required: true,
        maxLength: 40,
    }
})

const Test = mongoose.model('Test', testSchema);

module.exports = Test;


