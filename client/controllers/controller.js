/**
* @desc operation starts when controler is invoked
* @param loginCtrl,function as a parameter 
* @return bool - success or failure
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
* @desc operation starts when controler is invoked
* @param registrationCntr,function as a parameter
* @return bool - success or failure
*/
app.controller("registrationCntr", function ($scope, $location, servicesLogin) {
    /**
    * @desc register takes  no parameter gets the data from front end pass the data to service
    * @param registrationCntr,function as a parameter
    * @return bool - success or failure
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
    $scope.pageChange = () => {
        //directs to specified path
        $location.path("/#!/login");
    }
});
/**
* @desc operation starts when controler is invoked
* @param forgotPasswordCtrl,function as a parameter
* @return bool - success or failure
*/
app.controller("forgotPasswordCtrl", function ($scope, servicesLogin) {
    /**
    * @desc forgotPassword takes  no parameter gets the data from front end pass the data to service
    * @param forgotPasswordCtrl,function as a parameter
    * @return bool - success or failure
    */
    $scope.forgotPassword = () => {
        var data = {
            "Email": $scope.email
        }
        servicesLogin.forgotPassword(data, $scope);
    }
});
/**
* @desc operation starts when controler is invoked
* @param resetPasswordCtrl,function as a parameter
* @return bool - success or failure
*/

app.controller("resetPasswordCtrl", function ($scope, servicesLogin, $location) {
    //checks for the token exist,if exist split the toekn from url
    if ($location.url().indexOf('token') !== -1) {
        $scope.token = $location.url().split('=')[1];
        console.log("Token in controler", $scope.token)
    }
    /**
       * @desc resetPassword takes  no parameter gets the data from front end pass the data to service
       * @param resetPasswordCtrl,function as a parameter
       * @return bool - success or failure
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



