'use strict';

module.exports = function(app) {

    var eshopController = require('../controllers/eshopusController');

    app.route('/api/eshopus')
        .get(eshopController.get_games_list);
    app.route('/api/eshopprice')
        .get(eshopController.get_games_price);
}
