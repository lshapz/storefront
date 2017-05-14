'use strict';

/**
 * @ngdoc function
 * @name app.controller:ShopCartCtrl
 * @description
 * # ShopCartCtrl
 * Controller of the app
 */
angular.module('sampleApp')
.controller('ProductCheckoutCtrl', ['$scope', 'ngCart', '$http', function ($scope, ngCart, $http) {
    var json = $http.post('https://nameless-sands-65262.herokuapp.com/api/v1/orders.json?token=8779437c5723b3cd5586bd590b4f9c1e02c448a02c3db7a7').then(function (response) {
      let number = response.data.number
    return number
    });
   ngCart.setTaxRate(7.5);
   ngCart.setShipping(2.99);

}]);
