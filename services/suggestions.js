angular.module("steamCountdownApp")
.factory("suggestionsService", function($http) {
  return function(query) {
    return $http.get("https://crossorigin.me/http://store.steampowered.com/search/suggest", {
      params: {
        term: query,
        f: "games"
      }
    })
    .then(function(res) {
      var el = document.createElement("html");
      el.innerHTML = res.data;
      var matches = el.getElementsByClassName("match");
      var suggestions = [];
      for (var i = 0; i < matches.length; i++) {
        var v = matches[i];
        suggestions.push({
          appid: v.getAttribute("data-ds-appid"),
          name: v.getElementsByClassName("match_name")[0].innerText
        });
      }
      return suggestions;
    });
  }
});
