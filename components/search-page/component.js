angular.module("steamCountdownApp")
.component("searchPage", {
  templateUrl: "components/search-page/template.html",
  controller: function($scope, $timeout, suggestionsService, detailsService, featuredService, backgroundService) {
    var $ctrl = this;
    document.title = "SteamETA";

    backgroundService.images.length = 0;

    $scope.suggestions = [];

    var timeout = null;
    $scope.$watch("query", function(newval, oldval) {
      if (timeout) {
        $timeout.cancel(timeout);
        timeout = null;
      }
      timeout = $timeout(function() {
        timeout = null;
        if (!newval || newval.trim().length == 0) {
          featuredService().then(function(res) {
            var featured = res.coming_soon.items;

            $scope.suggestions = [];
            backgroundService.images.length = 0;

            for (var i = 0; i < featured.length && i < 5; i++) {
              $scope.suggestions.push({
                appid: featured[i].id,
                name: featured[i].name
              });
              backgroundService.images.push("http://cdn.akamai.steamstatic.com/steam/apps/" + featured[i].id + "/capsule_616x353.jpg");
            }
          });

        } else if (isNaN(parseInt(newval))) {
          suggestionsService(newval).then(function(res) {
            $scope.suggestions = [];
            backgroundService.images.length = 0;

            for (var i = 0; i < res.length && i < 5; i++) {
              $scope.suggestions.push(res[i]);
              backgroundService.images.push("http://cdn.akamai.steamstatic.com/steam/apps/" + res[i].appid + "/capsule_616x353.jpg");
            }
          });

        } else {
          detailsService(newval).then(function(res) {
            $scope.suggestions = [{
              appid: newval,
              name: res[newval].data.name
            }];
            backgroundService.images.length = 0;
            backgroundService.images.push("http://cdn.akamai.steamstatic.com/steam/apps/" + newval + "/capsule_616x353.jpg");
          });
        }
      }, 500);
    });

    $scope.$on("$destroy",function(){
      if(timeout) {
        $timeout.cancel(timeout);
      }
    });
  }
});
