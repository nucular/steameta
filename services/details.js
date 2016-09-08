angular.module("steamCountdownApp")
.factory("detailsService", function($http) {
  return function(appid, filters) {
    return $http.get("https://crossorigin.me/http://store.steampowered.com/api/appdetails/", {
      params: {
        appids: appid,
        filters: (filters ? filters.join(",") : "basic")
      }
    })
    .then(function(res) {
      return res.data;
    });
  }
});
