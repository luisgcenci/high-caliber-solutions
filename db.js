const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser:true, useUnifiedTopology: true});

const mongoose_con = mongoose.connection;

module.exports = mongoose_con;