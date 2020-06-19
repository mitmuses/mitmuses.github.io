// create Angular module (app)
var app = angular.module('app', ['ngRoute', 'firebase']);

// configure routes
app.config(function($routeProvider, $locationProvider) {

    // routes tell the angular app which view to load from the views folder
    // when a user requests a certain url
    $routeProvider

        // home route
        .when('/', {
            templateUrl : '/views/home.html',
            controller  : 'home-controller'
        })

        // members route
        .when('/members', {
            templateUrl : '/views/members.html',
            controller  : 'members-controller'
        })

        // media route
        .when('/media', {
            templateUrl : '/views/media.html',
            controller  : 'media-controller'
        })

        // auditions route
        .when('/auditions/', {
            templateUrl : '/views/auditions.html',
            controller  : 'auditions-controller'
        })

        // contact route
        .when('/contact', {
            templateUrl : '/views/contact.html',
            controller  : 'contact-controller'
        })

        // alumniMap route
        .when('/alumniMap', {
            templateUrl : '/views/alumniMap.html',
            controller  : 'alumniMap-controller'
        })

        // catch all -- if the url requested is not listed above, redirect
        // to the homepage
        .otherwise({
            redirectTo: '/'
        });

    // this enables direct navigation
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

});

// set up Firebase (database)
var config = {
    apiKey: "AIzaSyCh8DTmFzIZD_qwDcW3lnOhY7VldKAeGs8",
    authDomain: "mitmuses-8c97c.firebaseapp.com",
    databaseURL: "https://mitmuses-8c97c.firebaseio.com",
    storageBucket: "mitmuses-8c97c.appspot.com",
    messagingSenderId: "679403663997"
};
firebase.initializeApp(config);
