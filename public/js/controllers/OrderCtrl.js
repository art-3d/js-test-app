angular.module('OrderCtrl', [])
  .controller('OrderController', [
    '$scope',
    '$location',
    'Order',
    Controller
  ]);

function Controller(
  $scope,
  $location,
  orderService
) {

  $scope.search_key = 'id';
  $scope.order_target = 'id';
  $scope.order_asc = true;
  $scope.orderTypes = ['Wholesale', 'Retail'];
  $scope.order = {
    vendor: null,
    customer: null,
    type: null,
    create_date: null,
    fulfillment_date: null
  };
  $scope.formErrors = null;

  $scope.$watch('search_key', function (after, before) {
    if (!$scope.search_value) return;
    getOrders();
  });

  $scope.$watch('search_value', function (after, before) {
    getOrders();
  });

  $scope.createOrder = function (data) {
    var isValid = Object.values(data).every(e => { return (''+e).trim() !== ''});
    $scope.formErrors = isValid ? null : 'All fields are required';
    if (!isValid) return; 

    orderService.create(data)
      .then(function successCallback(resp) {
        $location.path('/orders');
      }, function errorCallback(resp) {
        $scope.formErrors = resp;
      });
  };

  $scope.orderTable = function (target) {
    if ($scope.order_target === target) {
      $scope.order_asc = !$scope.order_asc;
    }

    $scope.order_target = target;
  };

  $scope.editOrderAction = function (order) {
    $scope.editOrder = angular.copy(order);
  };

  $scope.sendPut = function (order) {
    var isValid = Object.values(order).every(e => e.trim() !== '');
    $scope.formErrors = isValid ? null : 'All fields are required';
    if (!isValid) return; 

    orderService.update(order.id, order)
      .then(function (resp) {
        angular.element('#edit-order').modal('hide');
        getOrders();
      });
  };

  function getOrders() {
    var parameters = {};
    if ($scope.search_value != '') {
      parameters.key = $scope.search_key.toLowerCase();
      parameters.value = $scope.search_value;
    }

    orderService.get(parameters)
      .then(function (resp) {
        var MILLISECONDS_IN_A_DAY = 86400000;
        var orders = resp.data.map(function (i) {
          var date = new Date(i.fulfillment_date);
          i.edit = ((date - new Date()) / MILLISECONDS_IN_A_DAY) > 3;
          return i;
        });

        $scope.orders = orders;
      });
  }
}