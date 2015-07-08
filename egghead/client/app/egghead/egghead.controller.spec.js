'use strict';

describe('Controller: EggheadCtrl', function () {

  // load the controller's module
  beforeEach(module('eggheadApp'));

  var EggheadCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EggheadCtrl = $controller('EggheadCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
