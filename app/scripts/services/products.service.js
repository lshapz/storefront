'use strict';

angular.module('snipcartAngularApp')
  .factory('Product', function ($http, $q) {
      var json = $http.get('https://nameless-sands-65262.herokuapp.com/api/v1/products.json?token=8779437c5723b3cd5586bd590b4f9c1e02c448a02c3db7a7').then(function (response) {
      let prod = response.data.products
      let useful = prod.map(item=>{
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          sku: item.master.sku,
          image: "https://nameless-sands-65262.herokuapp.com" + (item.master.images[0].large_url),
          description: item.description        
        }
      })



    return useful
    });


    return {
      query: function() {
        return json;
      },
      get: function(id) {
        var q = $q.defer();
// this is the
        json.then(function (items) {
          angular.forEach(items, function (item) {
            if (id === item.id) {
              q.resolve(item);
              return;
            }
          });
        });

        return q.promise;
      }
    };
  });
