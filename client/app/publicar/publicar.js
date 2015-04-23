'use strict';

angular.module('vctApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('publicar', {
        url: '/publicar',
        templateUrl: 'app/publicar/publicar.html',
        controller: 'PublicarCtrl'
      });
  });