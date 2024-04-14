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
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static('public'));
const port = process.env.PORT || 5000; // Use the dynamic port assigned by Heroku or default to 3000

app.use(bodyParser.urlencoded({ extended: true }));

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

app.get("/register.html",(req, res)=>{
    res.sendFile(__dirname+"/register.html");
})

app.listen(1234, ()=>{
    console.log("Server started");
})