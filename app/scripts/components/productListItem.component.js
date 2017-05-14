'use strict';

angular.module('sampleApp')
  .component('productListItem', {
    templateUrl: 'views/productlistitem.html',
    bindings: {
      'product': '<'
    }
  });
