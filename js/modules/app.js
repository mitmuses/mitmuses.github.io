// create Angular module
var app = angular.module('app', ['ngRoute', 'firebase']);

// configure routes and prettify urls
app.config(function($routeProvider, $locationProvider) {

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

        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

});

// set up Firebase

var config = {
    apiKey: "AIzaSyCh8DTmFzIZD_qwDcW3lnOhY7VldKAeGs8",
    authDomain: "mitmuses-8c97c.firebaseapp.com",
    databaseURL: "https://mitmuses-8c97c.firebaseio.com",
    storageBucket: "mitmuses-8c97c.appspot.com",
    messagingSenderId: "679403663997"
};
firebase.initializeApp(config);
