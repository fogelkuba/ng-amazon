const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');

const app = express();

mongoose.connect(config.database, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('db connection established');
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors());

const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/account');
const sellerRoutes = require('./routes/seller');

app.use('/api', mainRoutes);
app.use('/api/accounts', userRoutes);
app.use('/api/seller', sellerRoutes);

app.listen(config.port, err => {
    console.log("\x1b[33m", `App working on: ${config.port}, update`);
    if (err) {
        console.log("\x1b[41m", err);
    }
});