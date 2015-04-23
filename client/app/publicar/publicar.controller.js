'use strict';

angular.module('vctApp')
  .controller('PublicarCtrl', function ($scope,$http,FileUploader) {

    $scope.uploader = new FileUploader();

    $scope.uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    $scope.cargarCategorias= function () {
      $http.get('/api/categorias/').success(function (categorias) {
        $scope.categorias=categorias;
        $scope.data=categorias;
        $scope.seleccion=[{
          nombre:'Categoria',
          arbol:categorias,
          imagen:""
        }];
      });
    }
    $scope.cargarCategorias();

    $scope.seleccionar = function (cat) {
      $scope.seleccion.push({
        nombre:cat.nombre,
        arbol:cat,
        imagen:cat.imagen
      });
      $scope.data=cat.nodes;
      console.log($scope.seleccion);
      if (cat.nodes.length===0) {
        $("#titulo").focus();
      };
    }

    $scope.pansito = function (cat) {
      $scope.seleccionNueva=[{
        nombre:'Categoria',
        arbol:$scope.categorias
      }];
      $scope.data=$scope.categorias;
      console.log(cat.nombre);
      if (cat.nombre!='Categoria') {
        console.log($scope.seleccion)
        for (var i = 1; i < $scope.seleccion.length; i++) {
          $scope.seleccionNueva.push({
            nombre:$scope.seleccion[i].nombre,
            arbol:$scope.seleccion[i].arbol
          });
          if ($scope.seleccion[i].nombre===cat.nombre) {
            // console.log($scope.seleccion[i]);
            $scope.data=$scope.seleccion[i].arbol.nodes;
            i=$scope.seleccion.length+1
          }
        };
      };
      $scope.seleccion=$scope.seleccionNueva;
    }


  });
