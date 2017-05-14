'use strict';

angular.module('sampleApp')
  .component('buyButton', {
    templateUrl: 'views/buybutton.html',
    bindings: {
      'product' : '<'
    }
  });
