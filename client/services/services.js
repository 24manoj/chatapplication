
/**
* @desc operation starts when services is invoked
* @param servicesLogin,function as a parameters
* @return bool - success or failure
*/

app.service('servicesLogin', function ($http, $location, SocketService) {

    this.createGrp = (data) => {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/createGrpdata',
            data: data
        }).then(function sucessCallback(response) {
            console.log(" Response===>grp", response);
            $location.path("/userDashbord.html");
        },
            function errrCallback(response) {
                $scope.result = "Group not created ";
                console.log("Login UnSucessFull ===>", response);
            });

    }


    /**
    * @desc login  gets the data from front end pass the data to service
    * @param data scope  as a parameter
    * @return bool - success or failure
    */
    this.login = (data, $scope) => {
        //sending the data as a http request and // console.log(loginDetails.Email); response format
        $http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: data
        }).then(function sucessCallback(response) {
            let user = response.data[0];
            console.log(" Response===>datalogin", user);
            $location.path("/userDashbord");
            localStorage.setItem('user', JSON.stringify(user));
            console.log("Login sucess ==>", response);
        },
            function errrCallback(response) {
                $scope.result = "In correct Email and password ";
                console.log("Login UnSucessFull ===>", response);
            });

    }
    /**
    * @desc register   gets the data from front end pass the data to service
    * @param data scope  as a parameter
    * @return bool - success or failure
    */

    this.register = (data, $scope) => {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/register',
            data: data
        }).then(function sucessCallback(response) {
            //direct to specified path
            $location.path("/login");
            console.log("Register sucess ==>", response);
        }, function errrCallback(response) {
            //$location.path("#");
            if ($scope.email != null)
                $scope.result = response.data;
            else
                $scope.result = response.data.error[0].msg;
            console.log("Register UnSucessFull ===>", response);
        });

    }

    /**
    * @desc forgotPassword gets the data from front end pass the data to service
    * @param data scope  as a parameter
    * @return bool - success or failure
    */
    this.forgotPassword = (data, $scope) => {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/forgotPassword',
            data: data
        }).then(function sucessCallback(response) {
            $scope.result = "Verification sent to mail..Plz verify "

            console.log("Verify sucess ==>", response);
        },
            function errrCallback(response) {
                if ($scope.email == null)
                    $scope.result = response.data.error[0].msg;
                else
                    $scope.result = "Email not Exist";
                console.log("verify UnSucessFull ===>", response);
            });
    }

    /**
      * @desc resertPassword gets the data from front end pass the data to service
      * @param data scope  as a parameter
      * @return bool - success or failure
      */
    this.resetPassword = (data, $scope) => {
        console.log("scope token in services", $scope.token);
        $http({
            method: 'POST',
            url: 'http://localhost:3000/resetpassword/' + $scope.token,
            data: data
        }).then(function sucessCallback(response) {
            $scope.result = "Changed Sucessfully";
            console.log("changed sucess ==>", response.status);
        },
            function errrCallback(response) {
                if ($scope.Password == null && $scope.confirmPassword == null)
                    $scope.result = response.data.error[0].msg;
                else
                    $scope.result = "Password mismatch";
                console.log("changed UnSucessFull ===>", response);
            });

    }

    this.getUsers = ($scope) => {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/getUsers'
        }).then(function sucessCallback(response) {
            $scope.data = response.data;
            console.log("fetch sucess ==>", response);
        },
            function errrCallback(response) {
                $scope.value = "No users registred.. ";
                console.log("changed UnSucessFull ===>", response);
            });

    }


    this.getMsg = ($scope, value) => {
        console.log("$scope.USermail in get msgs services", $scope.userEmail)
        let data = {
            "from": $scope.userEmail,
            "to": value.Email,
        }
        // SocketService.emit('Message', data);
        localStorage.setItem('msgData', JSON.stringify(data));
        $http({
            method: 'POST',
            url: 'http://localhost:3000/getMsg',
            data: data
        }).then(function sucessCallback(response) {
            $scope.msgs = response.data;
            SocketService.emit('updateList', response.data);
            console.log("fetch sucess ==>", response);
        });


    },
        function errrCallback(response) {
            $scope.value = "No users registred.. ";
            console.log("fetch UnSucessFull ===>", response);


        }
    this.getMsges = ($scope, value) => {
        console.log("$scope.USermail in get msgs services", $scope.userEmail)
        let data = {
            "from": $scope.userEmail,
            "to": value.Email,
        }
        // SocketService.emit('Message', data);
        localStorage.setItem('msgData', JSON.stringify(data));
        $http({
            method: 'POST',
            url: 'http://localhost:3000/getMsg',
            data: data
        }).then(function sucessCallback(response) {
            $scope.msgs = response.data;
            SocketService.emit('updateList', response.data);
            console.log("fetch sucess ==>", response);
        });
    },
        function errrCallback(response) {
            $scope.value = "No users registred.. ";
            console.log("fetch UnSucessFull ===>", response);


        }
    this.getUserName = ($scope) => {
        let loginDetails = JSON.parse(localStorage.getItem('user'));
        $scope.userEmail = loginDetails.Email;
        console.log($scope.userEmail);
        $scope.username = loginDetails.firstName

    }
    this.logout = () => {
        $location.path('/');
    }

    this.storeMsg = ($scope, data) => {

        $http({
            method: 'POST',
            url: 'http://localhost:3000/storeMsg',
            data: data
        }).then(function sucessCallback(response) {
            console.log(data);
        },
            function errrCallback(response) {
                $scope.value = "No users registred.. ";
                console.log("msg not sent===>", response);
            });
    }
});