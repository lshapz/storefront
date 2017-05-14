'use strict';

angular.module('sampleApp')
  .controller('MainCtrl', function ($scope, products) {
    $scope.products = products;
  });
