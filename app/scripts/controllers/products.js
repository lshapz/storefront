'use strict';

angular.module('sampleApp')
  .controller('ProductsCtrl', function ($scope, $stateParams, product) {
    $scope.product = product;
  });
