// import http from 'http';
// import express from 'express';
// import bodyParser from 'body-parser';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// import fs from 'fs';

// const __dirname = dirname(fileURLToPath(import.meta.url));

// const app = express();
// app.use(express.static('public'));

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static('public'));
const port = process.env.PORT || 5000; // Use the dynamic port assigned by Heroku or default to 3000

app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017');
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



app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.get("/index.html", (req, res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.get("/about.html",(req, res)=>{
    res.sendFile(__dirname+"/about.html");
})

app.get("/contact.html",(req, res)=>{
    res.sendFile(__dirname+"/contact.html");
})

app.get("/login.html",(req, res)=>{
    res.sendFile(__dirname+"/login.html");
})

//login route
app.post('/login.html', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email, password }, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        } else if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
        } else {
            res.status(200).json({ message: 'Login successful', user });
        }
    });
});

app.get("/register.html",(req, res)=>{
    res.sendFile(__dirname+"/register.html");
})

// Register route
app.post('/register.html', (req, res) => {
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

