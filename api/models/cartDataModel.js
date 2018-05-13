'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    nsuid: {
        type: String,
        required: 'NSUID'
    },
    title: {
        type: String,
        required: 'CART_TITLE'
    },
    historical_pricing: [{
        type: Number,
    }],
    ca_historical_pricing: [{
        type: Number,
    }],
    pricing_dates: [{
        type: Date
    }],    
    ca_pricing_dates: [{
        type: Date
    }],
    last_sale_date: {
        type: Date
    }
});

module.exports = mongoose.model('Carts', CartSchema);
