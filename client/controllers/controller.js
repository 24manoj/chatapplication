/**
* @desc operation starts when controler is invoked
* @param loginCtrl ,invokes when the login page invoked
* @param $scope ,inheriates the parent process $rootScope,which can be used throught this session.
* @param servicesLogin,creting an service contoler for logincontrol
*/
app.controller("loginCtrl", function ($scope, servicesLogin) {
    $scope.submit = () => {
        var data = {
            "Email": $scope.email,
            "Password": $scope.password
        }
        console.log("data", data);
        servicesLogin.login(data, $scope);
    }
});
/**
* @desc is a controler function ,contains all opertions to perform when registering
* @param registrationCntr ,invokes when the login page invoked
* @param $scope ,inheriates the parent process $rootScope,which can be used throught this session.
* @param servicesLogin,creting an service contoler for logincontrol.
* @param $location,is a global scope,used to redirect the pages.
*/
app.controller("registrationCntr", function ($scope, $location, servicesLogin) {
    /**
    * @desc collects  data  from  html,filters the data 
    * @param null,
    * @return invokes services.register
    */
    $scope.register = () => {
        var data = {
            "firstName": $scope.firstName,
            "LastName": $scope.LastName,
            "Email": $scope.Email,
            "Password": $scope.Password
        }
        servicesLogin.register(data, $scope);
    }
    /**
    * @desc invokes when registration is sucessfull
    * @param null,
    * @return redirects to login page
    */
    $scope.pageChange = () => {
        //directs to specified path
        $location.path("/#!/login");
    }
});
/**
* @desc function takes userEmail as input verfies,send mail to registered mail
* @param forgotPasswordCtrl,inokes when forgotPassword page started
* @param $scope ,inheriates the parent process $rootScope,which can be used throught this session.
* @param servicesLogin,creting an service contoler for logincontrol.
*/
app.controller("forgotPasswordCtrl", function ($scope, servicesLogin) {
    /**
    * @desc formats the data required and pass the data as request
    * @param null,
    * @return invokes services.forgotPassword
    */
    $scope.forgotPassword = () => {
        var data = {
            "Email": $scope.email
        }
        servicesLogin.forgotPassword(data, $scope);
    }
});

/**
* @desc is a controler function ,contains all opertions to perform on resetPassword
* @param resetPasswordCtrl,invokes when user clicks on verfication link
* @param $scope ,inheriates the parent process $rootScope,which can be used throught this session.
* @param servicesLogin,creting an service contoler for logincontrol.
* @param $location,is a global scope,used to redirect the pages.
*/
app.controller("resetPasswordCtrl", function ($scope, servicesLogin, $location) {
    //checks for the token exist,if exist split the toekn from url
    if ($location.url().indexOf('token') !== -1) {
        $scope.token = $location.url().split('=')[1];
        console.log("Token in controler", $scope.token)
    }
    /**
    * @desc formats the data required and pass the data as request
    * @param null,
    * @return invokes services.resetPassword
    */
    $scope.resetPassword = () => {
        if ($scope.Password == null || $scope.confirmPassword == null) {
            $scope.result = "Passwords Cant be null";
        }
        else {
            var data = {
                "Password": $scope.Password,
                "confirmPassword": $scope.confirmPassword
            }
            servicesLogin.resetPassword(data, $scope);
        }
    }
});



