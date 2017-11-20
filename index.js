//Require

const express = require('express');
require('colors');
const mongoose = require('mongoose');
const util = require('util');
const bodyParser = require('body-parser');


//Create application with ExpressJS

const app = express();
const collaborateur = require('./Collaborateur.controller');


// Transform app.listen into a Promise
const Listen = (app, port, ip) => {
    return new Promise((resolve, reject) => {
        app.listen(port, ip, resolve)
    })
}	

app.use('/', bodyParser.json());
app.use('/', (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	next();
});
app.get('/collaborateurs', collaborateur.findAll);
app.get('/collaborateur/:id', collaborateur.findOne);
app.post('/collaborateur', collaborateur.create)
app.put('/collaborateur/:id', collaborateur.update)
app.delete('/collaborateur/:id', collaborateur.remove)

// Config

app.set('ip', 'localhost')
app.set('port', 1337)


//So mongoose know that promises it has to use will be in Node.js (global object)
mongoose.Promise = global.Promise;

mongoose
	.connect('mongodb://localhost:27017/intranet', {useMongoClient:true})
	.then(() => Listen(app, app.get('port'), () => console.log('App started'.rainbow))
	.catch( err => console.log(err.message.red))
	)
