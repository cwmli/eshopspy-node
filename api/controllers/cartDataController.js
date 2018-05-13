'use strict';

var mongoose = require('mongoose');
var Cart = mongoose.model('Carts');

exports.show_all_carts = function(req, res) {
    Cart.find({}, function(err, cart) {
        if (err) {
            res.send(err);
        }

        res.json(cart);
    });
};

exports.create_a_cart = function(req, res) {
    var newCart = new Cart(req.body);
    newCart.save(function(err, cart) {
        if (err) {
            res.send(err);
        }

        res.json(cart);
    });
};

exports.read_a_cart = function(req, res) {
    Cart.findOne({nsuid: req.params.eshopCartId}, function(err, cart){
        if (err) {
            res.send(err);
        }

        res.json(cart);
    });
};

exports.update_a_cart = function(req, res) {
    Cart.findOneAndUpdate({nsuid: req.params.eshopCartId}, req.body, {new: true}, function(err, cart){ 
        if (err) {
            res.send(err);
        }

        res.json(cart);
    });
};

exports.delete_a_cart = function(req, res) {
    Cart.remove({nsuid: req.params.eshopCartId}, function(err, cart){ 
        if (err) {
            res.send(err);
        }

        res.json({ message: 'eshopCart history deleted.' });
    });
};
