'use strict';

const eshop = require('nintendo-switch-eshop');
const Q = require('q');

var mongoose = require('mongoose');
var schedule = require('node-schedule');
var Cart = mongoose.model('Carts');


function promiseWhile(cond, body) {
    var done = Q.defer();

    function loop() {
        if (!cond()) return done.resolve();

        Q.when(body(), loop, done.reject);
    }

    Q.nextTick(loop);

    return done.promise;
}


var eshopusPScrape = schedule.scheduleJob('30 13 * * *', function(fireDate) {
    console.log("eshopusPScrape: Running price update job [" + fireDate + "]");

    var paginatable = true;
    var offset = 0;
    
    
    promiseWhile(function() { return paginatable; }, function() {
        
        return eshop.getGamesAmerica({limit: 50}, offset.toString()).then((data) => {
            
            if (data.length == 0) {
                paginatable = false;
                return;
            }
            
            var nsuids = [];

            data.map(function(cart) {

                if (nsuids.indexOf(cart.nsuid) === -1) {
                    if (cart.nsuid) {
                        nsuids.push(cart.nsuid);
                    }
        
                    Cart.findOneAndUpdate(
                            {nsuid: cart.nsuid},
                            {nsuid: cart.nsuid,
                            title: cart.title},
                            {upsert: true},
                            function(err, res) {
                                if (err) return;
                        });
                }
            });
            
            return eshop.getPrices('CA', nsuids).then((capriceData) => {
                capriceData.prices.forEach(function(priceObj) {
                    var price = priceObj.sales_status == "onsale" ? priceObj.regular_price.raw_value : 'NaN'

                    Cart.findOneAndUpdate(
                        {nsuid: priceObj.title_id},
                        { $push: { ca_historical_pricing: priceObj.discount_price ? 
                                        priceObj.discount_price.raw_value : price,
                                ca_pricing_dates: new Date()}},
                        {upsert: true},
                        function(err, res) {
                            if (err) return;
                    });
                });     

                offset += 50;
                
                // return eshop.getPrices('US', nsuids).then((uspriceData) => {
            
                //         uspriceData.prices.forEach(function(priceObj) {
                //             Cart.findOneAndUpdate(
                //                 {nsuid: priceObj.title_id},
                //                 { $push: { historical_pricing: priceObj.discount_price ? 
                //                                 priceObj.discount_price.raw_value : priceObj.regular_price.raw_value,
                //                         pricing_dates: new Date()}},
                //                 {upsert: true},
                //                 function(err, res) {
                //                     if (err) return;
                //             });
                //         });
            
                //         offset += 50;
                //     });
    
                // }, (err) => console.log(err));
                
            }, (err) => console.log(err));
        }, (err) => console.log(err));
            
    }).then(function() {
        console.log("eshopusPScrape: Job complete [" + new Date() + "]");
    }).done();
   
});
