'use strict';

/**
 * @ngdoc function
 * @name app.controller:ShopCartCtrl
 * @description
 * # ShopCartCtrl
 * Controller of the app
 */
angular.module('sampleApp')
.controller('ShopCartCtrl', ['$scope', 'ngCart', '$http', function ($scope, ngCart, $http) {

   ngCart.setTaxRate(7.5);
   ngCart.setShipping(2.99);

}]);
