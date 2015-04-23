'use strict';

angular.module('vctApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('categorias', {
        url: '/admin/categorias',
        templateUrl: 'app/admin/categorias/categorias.html',
        controller: 'CategoriasCtrl'
      });
  });