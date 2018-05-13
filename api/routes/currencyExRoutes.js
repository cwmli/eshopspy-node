'use strict';

const request = require('request');

module.exports = function(app) {
    app.route('/api/exchange').get((req, res) => {
        var base = req.query.base;

        console.log("/api/exchange with QUERY:");
        console.log(req.query);

        new Promise((resolve, reject) => {
            request.get({
                url: 'https://api.fixer.io/latest',
                qs: {
                    base: base
                }
            }, (err, res, body) => {
                if (err) return reject(err);

                var filteredResponse = JSON.parse(body);
                return resolve(filteredResponse);
            })
        }).then(function(data) {
            res.send({
                rates: data.rates,
                base: data.base
            });
        })
    });
}