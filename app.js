angular.module("steamCountdownApp", ["ngRoute"])
.config(function($routeProvider) {
  $routeProvider
  .when("/search", {
    template: "<search-page></search-page>"
  })
  .when("/app/:appid", {
    template: "<countdown-page></countdown-page>"
  })
  .otherwise('/search');
});
