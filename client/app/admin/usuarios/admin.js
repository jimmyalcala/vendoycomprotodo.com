'use strict';

angular.module('vctApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin/usuarios',
        templateUrl: 'app/admin/usuarios/admin.html',
        controller: 'AdminCtrl'
      });
  });
