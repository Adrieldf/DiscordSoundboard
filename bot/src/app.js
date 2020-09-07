
const express = require('express');
const app = express();
const router = express.Router();
//Rotas
const index = require('../main');
const baseRoute = require('./routes/baseRoute');
app.use('/', index);
app.use('/base', baseRoute);
module.exports = app;
