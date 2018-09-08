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

// app.get('/', (req, res, next) => {
//     res.json({
//         user: 'Jay Eff',
//     })
// });

const userRoutes = require('./routes/account');
app.use('/api/accounts', userRoutes);

app.listen(config.port, err => {
    console.log("\x1b[33m", `App working on: ${config.port}, update`);
    if (err) {
        console.log("\x1b[41m", err);
    }
});