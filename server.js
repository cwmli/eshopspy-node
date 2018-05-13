const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

var app = express();
var port = process.env.PORT || 8000;

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

// Models
var Cart = require('./api/models/cartDataModel');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Eshopcardsdb');

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routes
var eshopcmpRoutes = require('./api/routes/eshopcmpRoutes');
var eshopusRoutes = require('./api/routes/eshopusRoutes');
var currencyExRoutes = require('./api/routes/currencyExRoutes');
eshopcmpRoutes(app);
eshopusRoutes(app);
currencyExRoutes(app);

app.listen(port, () => {
    console.log("eshopcmp REST API server started on: " + port);
});

// Jobs
var priceScrape = require('./jobs/priceScrape');

