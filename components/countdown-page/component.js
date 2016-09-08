angular.module("steamCountdownApp")
.component("countdownPage", {
  templateUrl: "components/countdown-page/template.html",
  controller: function($scope, $routeParams, $interval, releaseDateService, detailsService, backgroundService) {
    var $ctrl = this;
    
    $scope.appId = $routeParams.appid;
    $scope.countdownString = "..."

    var releaseDate;
    var interval = null;

    detailsService($scope.appId, ["screenshots", "basic"])
    .then(function(res) {
      $scope.name = res[$scope.appId].data.name;
      backgroundService.images.length = 0;
      var screenshots = res[$scope.appId].data.screenshots;
      for (var i = 0; i < screenshots.length && i < 5; i++) {
        backgroundService.images.push(screenshots[i].path_thumbnail);
      }

      releaseDateService($scope.appId)
      .then(function(res) {
        releaseDate = res;
        if (res) {
          $scope.releaseDateString = res.toLocaleString();
          interval = $interval(function() {
            var remainder = releaseDate - new Date();
            if (remainder > 0) {
              $scope.countdownString = millisecondsToStr(remainder);
            } else {
              $scope.releaseDateString = "";
              $scope.countdownString = "released!"
            }
            document.title = $scope.countdownString;
          }, 1000);
        } else {
          $scope.releaseDateString = "";
          $scope.countdownString = "unknown"
          document.title = $scope.countdownString;
        }
      });
    })

    $scope.$on("$destroy",function(){
      if(interval) {
        $interval.cancel(interval);
      }
    });
  }
});
