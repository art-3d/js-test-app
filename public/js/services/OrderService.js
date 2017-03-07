angular.module('OrderService', [])
  .service('Order', ['$http', function ($http) {
    return {
      get: function (params) {
        return $http({method: 'GET', url: '/api/orders', params: params});
      },

      create: function (data) {
        return $http.post('/api/orders', data);
      },

      delete: function (id) {
        return $http.delete('/api/orders/' + id);
      },

      update: function (id, data) {
        return $http.put('/api/orders/' + id, data);
      }
    };
  }]);
