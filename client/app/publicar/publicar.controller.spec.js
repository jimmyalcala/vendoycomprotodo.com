'use strict';

describe('Controller: PublicarCtrl', function () {

  // load the controller's module
  beforeEach(module('vctApp'));

  var PublicarCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PublicarCtrl = $controller('PublicarCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
