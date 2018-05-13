'use strict';

const eshop = require('nintendo-switch-eshop');

exports.get_games_list = function(req, res) {
    var offset = req.query.offset;
    var limit = req.query.limit;
    var sale = req.query.sale ? true : false;

    console.log("/api/eshopus with QUERY:");
    console.log(req.query);
    
    var retrieve = function(data) {
        var cartsArray = [];
    
        data.map(function(cart) {
            var uscart = {};
    
            uscart.title = cart.title;
            uscart.id = cart.id;
            uscart.nsuid = cart.nsuid;
    
            uscart.front_box_art = cart.front_box_art;
            uscart.release_date = cart.release_date;
            uscart.slug = cart.slug;
    
            uscart.usd_price = cart.eshop_price;
            uscart.cad_price = cart.ca_price;
            uscart.sale_price = cart.sale_price;
            uscart.free_to_start = cart.free_to_start;
    
            uscart.number_of_players = cart.number_of_players;
    
            cartsArray.push(uscart);
        })
    
    
        res.send({
            cartsArray
        });
    };

    if (sale) {
        eshop.getGamesAmerica({limit: 50, sale: true}, offset).then(retrieve, (err) => res.send(err));
    } else {
        eshop.getGamesAmerica({limit: 50}, offset).then(retrieve, (err) => res.send(err));
    }
};

exports.get_games_price = function(req, res) {
    var gameIds = req.query.gameIds.split(",").filter(id => id.length > 0);
    var country = req.query.country;

    console.log("/api/eshopprice with QUERY:");
    console.log(req.query);

    eshop.getPrices(country, gameIds).then((data) => {
        var cartsPrices = [];

        if(data.prices) {
            data.prices.map(function(cart) {
                var uscart = {};

                uscart.reg_price = cart.regular_price.raw_value;
                uscart.title = cart.title_id;
                uscart.price = cart.discount_price ? cart.discount_price.raw_value : 'NaN';

                cartsPrices.push(uscart);
            })
        }

        res.send({cartsPrices});
    });
};
