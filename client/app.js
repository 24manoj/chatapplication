var app = angular.module("myApp", ["ngRoute", 'btford.socket-io']);


app.config(function ($routeProvider) {
    console.log("route.ts")

    $routeProvider
        .when('/', {
            templateUrl: "./views/login.html",
            controller: "loginCtrl"
        })
        .when('/register', {
            templateUrl: "./views/register.html",
            controller: "registrationCntr"

        })
        .when('/forgotPassword', {
            templateUrl: "./views/forgotPassword.html",
            controller: "forgotPasswordCtrl"

        })
        .when('/resetpassword', {
            templateUrl: "./views/resetPassword.html",
            controller: "resetPasswordCtrl"

        })
        .when('/userDashbord', {
            templateUrl: "./views/userDashbord.html",
            controller: "listUsers"

        })
        .when('/groupChat', {
            templateUrl: "./views/groupChat.html",
            controller: "listUsers"

        })
        .when('/redirect', {
            templateUrl: "./views/userDashbord.html",
            controller: "listUsers"

        })
        .otherwise({
            redirectTo: "/"
        });
});


app.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:3000')
    });
}]);

