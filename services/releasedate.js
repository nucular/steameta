angular.module("steamCountdownApp")
.factory("releaseDateService", function($http) {
  return function(appid) {
    return $http.get("https://crossorigin.me/http://store.steampowered.com/app/" + appid)
    .then(function(res) {
      var m = res.data.match(/var\s*oDate\s*=\s*new\s*Date\(\s*"([^"]+)"\s*\);/);
      if (m)
        return new Date(m[1]);
      else
        return null;
    });
  }
});
