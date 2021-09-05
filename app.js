const express = require("express");
const path = require("path");
// const fs = require("fs");
const port = 8000;
const app = express();
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/contactDance' , {useNewUrlParser: true});

// define mongoose schema
var contactschema = new mongoose.Schema({
    name : String,
    phone : String,
    email : String,
    address : String,
    desc : String
})

var Contact = mongoose.model('Contsct' , contactschema)

//express specific stuff
app.use('/static' , express.static('static'))
app.use(express.urlencoded())

//pug specific stuff

app.set('view engine', 'pug')
app.set('views' ,path.join(__dirname , 'views'))

// endpoint
app.get('/' , (req , res)=>{
    const params = { }
    res.status(200).render('home.pug' , params) ; 
})
app.get('/contact' , (req , res)=>{
    const params = { }
    res.status(200).render('contact.pug' , params) ; 
})

app.post('/contact' , (req , res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not save to the database")
    })
})

//start the server
 
app.listen(port , ()=>{
    console.log(`The application started successfully on port ${port}`);

})