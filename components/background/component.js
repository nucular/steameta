angular.module("steamCountdownApp")
.component("background", {
  templateUrl: "components/background/template.html",
  controller: function($scope, $interval, backgroundService) {
    var $ctrl = this;

    $scope.images = backgroundService.images;
    $scope.imageId = 0;

    var interval = $interval(function() {
      $scope.imageId++;
      if ($scope.imageId >= $scope.images.length)
        $scope.imageId = 0;
    }, 10000);

    $scope.$on("$destroy",function(){
      if (interval) {
        $interval.cancel(interval);
      }
    });
  }
});
