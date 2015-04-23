'use strict';

describe('Controller: CategoriasCtrl', function () {

  // load the controller's module
  beforeEach(module('vctApp'));

  var CategoriasCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CategoriasCtrl = $controller('CategoriasCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
