'use strict';

angular.module('vctApp')
  .controller('SidebarCtrl', function ($scope,$rootScope, $http,$location, Auth) {

    $scope.isActive = function(route) {
      return route === $location.path();
    };


  });
