'use strict';

angular.module('vctApp')
  .controller('CategoriasCtrl', function ($scope,$http,$modal,SweetAlert) {

    $scope.cargarCategorias= function () {
      $http.get('/api/categorias/').success(function (categorias) {
        $scope.data=categorias;
      });
    }
    $scope.cargarCategorias();

    //Borrando la Categoria
    $scope.borrar = function(scope) {
      var categoria=scope.$modelValue
      SweetAlert.swal({
         title: "Seguro de borrar?",
         text: "La categoria : "+categoria.nombre,
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#DD6B55",
         cancelButtonText: "Cancelar!",
         confirmButtonText: "Sí, Borrarla!",
         closeOnConfirm: true},
      function(isConfirm){
        if (isConfirm) {
          $http.delete('/api/categorias/'+categoria._id).success(function (data) {
            scope.remove();
          });
        };
      });
    };

    //Editando la Categoria
    $scope.editar = function (scope) {
      var categoria=scope.$modelValue
      var modaleditar = $modal.open({
        templateUrl: 'app/admin/categorias/_editarCategoria.html',
        controller: ModalEditarCtrl,
        size: 'xl',
        resolve: {
          categoria: function () {
            return categoria;
          }
        }
      });
      modaleditar.result.then(function () {
          // $scope.getPagos();
        }, function () {

      });
    };

    var ModalEditarCtrl = function ($scope,$rootScope,$http,$modalInstance, categoria){
      $scope.categoria=categoria;
      var master = angular.copy(categoria);

      $scope.ok = function  () {
        var c = $scope.categoria;
        var data={
          nombre:c.nombre,
          padre:c.padre,
          activa:c.activa,
          ancestros:c.ancestros,
          imagen:c.imagen
        };
        var parametros={
          url:'/api/categorias/'+c._id,
          method:'PUT',
          data:data
        }

        $http(parametros).success(function  () {

           $modalInstance.close();
        });

      }
      $scope.cancelar = function () {
        angular.copy(master,$scope.categoria);
        $modalInstance.dismiss('cancel');
      };
    };

    //Colapsando categoria
    $scope.toggle = function(scope) {
      scope.toggle();
    };

    $scope.newSubItem = function (scope) {
      if (scope===null) {
        var nodeData={ancestros:[],padreNombre:"",_id:null,nombre:""};
      }else{
        var nodeData=scope.$modelValue;
      };

      var categoria ={
        nombre:"",
        activa:true,
        padre:nodeData._id,
        ancestros:nodeData.ancestros,
        imagen:"",
        nodes:[],
        padreNombre:nodeData.nombre
      }
      categoria.ancestros.push(nodeData._id);
      var modalAgregar = $modal.open({
        templateUrl: 'app/admin/categorias/_agregarCategoria.html',
        controller: ModalAgregarCtrl,
        size: 'xl',
        resolve: {
          categoria: function () {
            return categoria;
          }
        }
      });
      modalAgregar.result.then(function () {
          if (scope==null) {
            $scope.data.push(categoria);
          }else{
            nodeData.nodes.push(categoria);
          };
        }, function () {

      });
    };

    var ModalAgregarCtrl = function ($scope,$rootScope,$http,$modalInstance, categoria){
      $scope.categoria=categoria;
      if (categoria.padreNombre==="") {
        $scope.titulo ="Agregando categoria";
      }else{
        $scope.titulo ="Agregar subcategoria a "+categoria.padreNombre;
      };

      $scope.ok = function  () {
        var c = $scope.categoria;
        var data={
          nombre:c.nombre,
          padre:c.padre,
          activa:c.activa,
          ancestros:c.ancestros,
          imagen:c.imagen,
        };
        var parametros={
          url:'/api/categorias/',
          method:'POST',
          data:data
        }
        $http(parametros).success(function  (data) {
          $scope.categoria._id=data._id
          $modalInstance.close();
        });

      }
      $scope.cancelar = function () {
        // angular.copy(master,$scope.categoria);
        $modalInstance.dismiss('cancel');
      };
    };


    //Funciones de ayuda en el arbol de Categorias
    var getRootNodesScope = function() {
      return angular.element(document.getElementById("tree-root")).scope();
    };

    $scope.collapseAll = function() {
      var scope = getRootNodesScope();
      scope.collapseAll();
    };

    $scope.expandAll = function() {
      var scope = getRootNodesScope();
      scope.expandAll();
    };

  });
