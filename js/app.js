// create Angular module
var app = angular.module('app', ['ngRoute', 'firebase']);

// configure routes and prettify urls
app.config(function($routeProvider, $locationProvider) {

    $routeProvider

        // home route
        .when('/', {
            templateUrl : '/pages/home.html',
            controller  : 'home-controller'
        })

        // news route
        .when('/news', {
            templateUrl : '/pages/news.html',
            controller  : 'news-controller'
        })

        // events route
        .when('/events', {
            templateUrl : '/pages/events.html',
            controller  : 'events-controller'
        })

        // members route
        .when('/members', {
            templateUrl : '/pages/members.html',
            controller  : 'members-controller'
        })

        // media route
        .when('/media', {
            templateUrl : '/pages/media.html',
            controller  : 'media-controller'
        })

        // auditions route
        .when('/auditions', {
            templateUrl : '/pages/auditions.html',
            controller  : 'auditions-controller'
        })

        // contact route
        .when('/contact', {
            templateUrl : '/pages/contact.html',
            controller  : 'contact-controller'
        });


    $locationProvider.html5Mode(true);

});