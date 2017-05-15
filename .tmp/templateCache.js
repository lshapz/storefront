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
