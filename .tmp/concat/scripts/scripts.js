'use strict';

angular
  .module('sampleApp', ['ui.router', 'ngCart'])
  .config(["$urlRouterProvider", "$stateProvider", function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.when('', '/');

    // This rule will remove the trailing !/ that Snipcart does not remove when
    // the cart is closed. It allows Angular to navigate to the expected route.
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var match = path.match(/(.*)!\/{0,1}$/);

      if (match) {
        return match[1];
      }
    });

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          products: ["$q", "Product", function($q, Product) {
            var def = $q.defer();
            Product.query().then(function (data) {
              def.resolve(data);
            });
            return def.promise;
          }]
        }
      })
      .state('productDetails', {
        url: '/products/{productId}',
        templateUrl: 'views/productDetails.html',
        controller: 'ProductsCtrl',
        resolve: {
          product: ["$q", "$stateParams", "Product", function ($q, $stateParams, Product) {
            var def = $q.defer();
           return  Product.get($stateParams.productId)
          }]
        }
      })
      .state('checkout', {
        url: '/checkout',
        templateUrl: 'views/checkout.html',
        controller: 'ProductCheckoutCtrl'
      });



      ;
  }]);

'use strict';

angular.module('sampleApp')
  .controller('MainCtrl', ["$scope", "products", function ($scope, products) {
    $scope.products = products;
  }]);

'use strict';

angular.module('sampleApp')
  .controller('ProductsCtrl', ["$scope", "$stateParams", "product", function ($scope, $stateParams, product) {
    $scope.product = product;
  }]);

'use strict';

angular.module('sampleApp')
  .factory('Product', ["$http", "$q", function ($http, $q) {
    var order
    var getOrder = $http.post('https://nameless-sands-65262.herokuapp.com/api/v1/orders.json?token=8779437c5723b3cd5586bd590b4f9c1e02c448a02c3db7a7').then(function (response) {
      order = response.data.number
    });

      var json = $http.get('https://nameless-sands-65262.herokuapp.com/api/v1/products.json?token=8779437c5723b3cd5586bd590b4f9c1e02c448a02c3db7a7').then(function (response) {
      let prod = response.data.products
      let useful = prod.map(item=>{
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          sku: item.master.sku,
          image: "https://nameless-sands-65262.herokuapp.com" + (item.master.images[0].small_url),
          description: item.description,
          url: item.slug,
          weight: item.master.weight,
          order: order
        }
      }).sort((a,b)=>{return parseInt(a.id) - parseInt(b.id)}).slice(0, 6)



    return useful
    });


    return {
      query: function() {
        return json;
      },
      get: function(id) {

        var json = $http.get('https://nameless-sands-65262.herokuapp.com/api/v1/products/' + id + '.json?token=8779437c5723b3cd5586bd590b4f9c1e02c448a02c3db7a7').then((response=>{
        let item = response.data
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          sku: item.master.sku,
          image: "https://nameless-sands-65262.herokuapp.com" + (item.master.images[0].large_url),
          description: item.description,
          url: item.slug,
          weight: item.master.weight     
       
        }
        }))

        return json;
      }
    };
  }]);
'use strict';

angular.module('sampleApp')
  .component('buyButton', {
    templateUrl: 'views/buybutton.html',
    bindings: {
      'product' : '<'
    }
  });

'use strict';

angular.module('sampleApp')
  .component('productListItem', {
    templateUrl: 'views/productlistitem.html',
    bindings: {
      'product': '<'
    }
  });

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
   ngCart.setTaxRate(7.5);
   ngCart.setShipping(2.99);

}]);

angular.module('sampleApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/buybutton.html',
    "<button class=\"btn btn-lg btn-success\" type=\"button\" data-item-name=\"{{$ctrl.product.name}}\" data-item-price=\"{{$ctrl.product.price}}\" data-item-id=\"{{$ctrl.product.id}}\" data-item-url=\"{{$ctrl.product.url}}\" data-item-description=\"{{$ctrl.product.description}}\" data-item-image=\"{{$ctrl.product.image}}\" data-item-weight=\"{{$ctrl.product.weight}}\"> I want some! <span class=\"glyphicon glyphicon-ok\"></span> </button>"
  );


  $templateCache.put('views/checkout.html',
    "<a ui-sref=\"checkout\"> <ngcart-cart template-url=\"scripts/components/ngcart/cart.html\"></ngcart-cart> </a>"
  );


  $templateCache.put('views/main.html',
    "<ul class=\"nav\"> <li> <a ui-sref=\"main\" class=\"btn btn-default btn-lg\">Store</a></li> <li style=\"margin-left:50%\"><a ui-sref=\"checkout\"> <ngcart-summary template-url=\"scripts/components/ngcart/summary.html\"></ngcart-summary></a></li> </ul> <div class=\"container\"> <div class=\"row\"> <div ng-repeat=\"product in products\"> <div class=\"six columns\"> <product-list-item product=\"product\"></product-list-item> </div> </div> </div> </div> "
  );


  $templateCache.put('views/productDetails.html',
    "<ul class=\"nav\"> <li> <a ui-sref=\"main\" class=\"btn btn-default btn-lg\">Store</a></li> <li style=\"margin-left:50%\"><a ui-sref=\"checkout\"> <ngcart-summary template-url=\"scripts/components/ngcart/summary.html\"></ngcart-summary></a></li> </ul> <div id=\"bar\" class=\"eight columns\"> <div class=\"row\"> <div class=\"six columns\"> <h2 class=\"section-heading\"> {{product.name}} (${{product.price}}) </h2> <p class=\"lead\"> {{product.description}} </p> </div> <div class=\"four columns\"> <img class=\"img-responsive\" ng-src=\"{{product.image}}\" alt=\"\" ng-if=\"product.image\"> </div> </div> <div class=\"row\"> <div class=\"six columns text-left\"> <p> <ngcart-addtocart id=\"{{ product.id }}\" name=\"{{ product.name }}\" price=\"{{ product.price }}\" quantity=\"1\" quantity-max=\"30\" data=\"product\" template-url=\"scripts/components/ngcart/addtocart.html\">Add To Cart</ngcart-addtocart> </p> </div> <div class=\"six columns text-right\"> <p> </p> </div> </div> </div>"
  );


  $templateCache.put('views/productlistitem.html',
    "<div class=\"thumbnail\"> <img src=\"{{$ctrl.product.image}}\"> <div class=\"caption\"> <div> <h2 class=\"section-heading\">{{$ctrl.product.name}}</h2> <h5>${{$ctrl.product.price}} - {{$ctrl.product.order}}</h5> </div> <div> <a ui-sref=\"productDetails({productId:$ctrl.product.id})\">More details</a> </div> </div> </div>"
  );

}]);
