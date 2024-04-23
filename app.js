
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const httpProxy = require('http-proxy');
// Connection URL
const uri = 'mongodb+srv://snehakumari:123Aman@sneha.tbgpj9n.mongodb.net/?retryWrites=true&w=majority';


// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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
const proxy = httpProxy.createProxyServer();
app.use(express.static('public'));
const port = process.env.PORT || 5000; // Use the dynamic port assigned by Heroku or default to 5000


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: ['https://e-commerce-website-ft4k.onrender.com', '*'],// Allow requests from this origin
  methods: ['GET', 'POST'],      // Allow these HTTP methods
  allowedHeaders: ['Content-Type'], // Allow these headers
}));

app.use('/', (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:1234' });
});

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
    
    if (req.query.action === 'message') {
        // If the query parameter 'action' is 'message', redirect to home page
        res.redirect('/');
    } 
    else {
        // Otherwise, serve the contact.html file as usual
        res.sendFile(__dirname + "/contact.html");
    }
});


app.get("/api/login.html",(req, res)=>{
    res.sendFile(__dirname+"/login.html");
})

app.post('/api/login.html', async (req, res)=> {
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
