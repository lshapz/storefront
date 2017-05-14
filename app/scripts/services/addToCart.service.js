// 'use strict';

// angular.module('sampleApp')
//   .factory('Cart', function ($rootScope, $http) {
//       var json = $http.post('https://nameless-sands-65262.herokuapp.com/api/v1/orders.json?token=8779437c5723b3cd5586bd590b4f9c1e02c448a02c3db7a7').then(function (response) {
//       let number = response.data.number
//     return number
//     });


//     return {
//       query: function() {
//         return json;
//       },
//       add: function(id) {
//         var json = $http({
//           url: "https://nameless-sands-65262.herokuapp.com/api/v1/orders/" + number + "/line_items?line_item[variant_id]=" + id + "&line_item[quantity]=1.json?token=8779437c5723b3cd5586bd590b4f9c1e02c448a02c3db7a7",
//           method: 'POST',
//           'X-Spree-Token': "8779437c5723b3cd5586bd590b4f9c1e02c448a02c3db7a7"

//       }).then((response=>{
        
//         let item = response.data
        
//         return {
//           price: item.display_amount,
//           tax: item.total,       
//         }
//         }))

//         return json;
//       }
//     };
//   });