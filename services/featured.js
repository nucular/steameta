angular.module("steamCountdownApp")
.factory("featuredService", function($http) {
  return function(appid, filters) {
    return $http.get("https://crossorigin.me/http://store.steampowered.com/api/featuredcategories/")
    .then(function(res) {
      return res.data;
    });
  }
});
