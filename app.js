
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const mongoose = require('mongoose');
// Connection URL
const uri = 'mongodb+srv://snehakumari:123Aman@sneha.tbgpj9n.mongodb.net/?retryWrites=true&w=majority';


// Connect to MongoDB
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(uri);

// Get the default connection
const db = mongoose.connection;


// Define user schema
const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    phone: String,
    email: String,
    password: String
});

const Users = mongoose.model('Users', userSchema);
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Once the connection is open, do something
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Export the database connection
module.exports = db;

const app = express();
app.use(express.static('public'));
// const port = process.env.PORT || 5000; // Use the dynamic port assigned by Heroku or default to 5000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.get("/index.html", (req, res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.get("/about.html",(req, res)=>{
    res.sendFile(__dirname+"/about.html");
})

// app.get("/contact.html",(req, res)=>{
//     res.sendFile(__dirname+"/contact.html");
// })

app.get("/contact.html",(req, res)=>{
    // Check if a specific query parameter exists in the request
    
    // if (req.query.action === 'message') {
    //     // If the query parameter 'action' is 'message', redirect to home page
    //     res.redirect('/');
    // } 
    // else {
        // Otherwise, serve the contact.html file as usual
        res.sendFile(__dirname + "/contact.html");
    // }
});

app.post('/submit-enquiry', (req, res) => {
    const { name, machine, phone, message } = req.body;

    // Here, you can perform validation, data processing, and send email or store in database  

    // Example: Sending email using Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'miniyuvi33@gmail.com',
            pass: 'arizfiylabkvmznr',
        }
    });

    const mailOptions = {
        from: 'miniyuvi33@gmail.com',
        to: 'snehasingh5754@gmail.com',
        subject: 'New Enquiry',
        text: `Name: ${name}\nMachine: ${machine}\nPhoneNo: ${phone}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            //  res.status(500).send('Error sending enquiry');
        } else {
            console.log('Email sent:', info.response);
            // res.status(200).send('Enquiry sent successfully');
            res.redirect('/contact.html');
            alert('Please login');
        }
    });

});

app.get("/login.html",(req, res)=>{
    res.sendFile(__dirname+"/login.html");
})

app.post('/login.html', async (req, res)=> {
    const check = await Users.findOne({username: req.body.username});
    try {
        if (check.password == req.body.password ) {
            console.log('Login Successful');
            res.redirect('/');
        }
        else{
            console.log('Wrong Password');
        }
    } catch (err) {
        console.log('User not found');
        // res.redirect('/');
    }
})

app.get("/register.html",(req, res)=>{
    res.sendFile(__dirname+"/register.html");
})

app.post('/register.html', async (req, res) => {
    const data = {
           name: req.body.name, 
           username: req.body.username,  
           phone: req.body.phone,                                            
           email: req.body.email,
           password: req.body.password,
     }
     const newUser = new Users(data);
     await newUser.save();
     res.redirect('/');
 })

app.listen(1234, ()=>{
    console.log("Server started");
})
