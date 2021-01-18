//env stuff
require('dotenv').config();

//app stuff
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//db stuff
const mongoose_con = require('./db')
const Teammate = require('./models/Team')
const Test = require('./models/Test')

//emailer stuff
const nodemailer = require('nodemailer');

//app setup
const app = express();
app.use(methodOverride('_method'));
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'ejs');
const port = 3000;


// var test = new Test({
//     name: "Test3"
// })

// test.save();

//ROUTES
app.get('/', function (req, res){
    res.render('index');
});

app.get('/admin', function (req, res){

    var all_collections = mongoose_con.collections;

    mongoose_con.db.collection("teammates").find({}).toArray().then(collection_to_display =>{
        
        var collection_to_display = collection_to_display;

        res.render('admin', {
        all_collections:all_collections,
        collection_to_display:collection_to_display
        }
        )
    })
});

app.get('/admin/:collection', function (req, res){

    //collection's name of what we're trying to display
    var collection = req.params.collection;
    
    //all collections
    var all_collections = mongoose_con.collections;

    mongoose_con.db.collection(collection).find({}).toArray().then(collection_to_display =>{
        
        var collection_to_display = collection_to_display;

        res.render('admin', {
        all_collections:all_collections,
        collection_to_display:collection_to_display
        }
        )
    })
});

app.post('/sendemail/', function(req,res){

    var email = req.body.email;
    var subject = req.body.subject;
    var message = req.body.message;

    var transporter = nodemailer.createTransport({
        service: process.env.NODEMAILER_SERVICE,
        port: 587,
        secure:false,
        auth:{
            user:process.env.NODEMAILER_USER,
            pass:process.env.NODEMAILER_PASS
        } 
    });

    var mailOptions = {

        from:process.env.NODEMAILER_USER,
        to: process.env.NODEMAILER_TO,
        subject: subject,
        text: message + '\n\nfrom: ' + email
    };

    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            throw err;
        }
        else{
            console.log('Email sent: ' + info.response)
        }
    })

    res.redirect('/');
});

app.listen(port)