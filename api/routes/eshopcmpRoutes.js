'use strict';

module.exports = function(app) {
    var eshopCartData = require('../controllers/cartDataController');

    app.route('/api/eshopcarts')
        .get(eshopCartData.show_all_carts)
        .post(eshopCartData.create_a_cart);

    app.route('/api/eshopcarts/:eshopCartId')
        .get(eshopCartData.read_a_cart)
        .put(eshopCartData.update_a_cart)
        .delete(eshopCartData.delete_a_cart);
};
