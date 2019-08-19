
/**
* @desc is a controler function ,contains all opertions to perform when registering
* @param servicesLogin ,invokes when the login page invoked
* @param $scope ,inheriates the parent process $rootScope,which can be used throught this session.
* @param servicesLogin,creting an service contoler for logincontrol.
* @param $location,is a global scope,used to redirect the pages.
*/

app.service('servicesLogin', function ($http, $location, SocketService) {

    /**
     * @desc invokes when user try to login
     * @param data contains users login details.
     * @param $scope is a cild process of rootSope contains session values
     * @return sucess or failure
     * */
    this.login = (data, $scope) => {
        //sending the data as a http request
        try {
            $http({
                method: 'POST',
                url: 'http://localhost:3000/login',
                data: data
            }).then(function sucessCallback(response) {
                let user = response.data[0];

                $location.path("/userDashbord");
                //storing the values in localstorage
                localStorage.setItem('user', JSON.stringify(user));
                console.log("Login sucess ==>", response);
            },
                function errrCallback(response) {
                    $scope.result = "In correct Email and password ";
                    console.log("Login UnSucessFull ===>", response);
                });
        } catch (e) {
            console.log(e);
        }
    }
    /**
     * @desc register   gets the data from front end pass the data to service
     * @param data contains users register details.
     * @param $scope is a cild process of rootSope contains session values
     * @return sucess or failure
     * */
    this.register = (data, $scope) => {
        try {
            $http({
                method: 'POST',
                url: 'http://localhost:3000/register',
                data: data
            }).then(function sucessCallback(response) {
                //direct to specified path
                $location.path("/login");
                console.log("Register sucess ==>", response);
            }, function errrCallback(response) {
                if ($scope.email != null)
                    $scope.result = response.data;
                else
                    $scope.result = response.data.error[0].msg;
                console.log("Register UnSucessFull ===>", response);
            });
        } catch (e) {
            console.log(e);
        }

    }


    /**
     * @desc invokes when clicks on forgot password
     * @param data contains users login details.
     * @param $scope is a cild process of rootSope contains session values
     * @return sucess or failure
     * */
    this.forgotPassword = (data, $scope) => {
        try {
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
        } catch (e) {
            console.log(e);
        }
    }

    /**
         * @desc invokes when clicks on verification link 
         * @param data contains users login details.
         * @param $scope is a cild process of rootSope contains session values
         * @return sucess or failure
         * */
    this.resetPassword = (data, $scope) => {
        try {
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
        } catch (e) {
            console.log(e);
        }
    }
    /**
         * @desc invokes when user loges in sucessfully
         * @param $scope is a cild process of rootSope contains session values
         * @return sucess or failure
         * */
    this.getUsers = ($scope) => {
        try {
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
        } catch (e) { console.log(e) }
    }

    /**
         * @desc invokes when user clicks on a particular person 
         * @param value contains reciver details.
         * @param $scope is a cild process of rootSope contains session values
         * @return sucess or failure
         * */
    this.getMsg = ($scope, value) => {
        try {
            let data = {
                "from": $scope.userEmail,
                "to": value.Email,
            }
            localStorage.clear;
            localStorage.setItem('msgData', JSON.stringify(data));
            $http({
                method: 'POST',
                url: 'http://localhost:3000/getMsg',
                data: data
            }).then(function sucessCallback(response) {
                $scope.msgs = response.data;
                console.log("fetch sucess ==>", response);
            }
                ,
                function errrCallback(response) {
                    $scope.value = "No users registred.. ";
                    console.log("fetch UnSucessFull ===>", response);
                })
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * @desc invokes when clicks on group
     * @param value contains users group details.
     * @param $scope is a cild process of rootSope contains session values
     * @return sucess or failure
     * */
    this.getGrpMsg = ($scope, value) => {
        try {
            let data = {
                "from": $scope.userEmail,
                "groupName": value.groupName
            }
            localStorage.clear;
            localStorage.setItem('msgData', JSON.stringify(data));
            $http({
                method: 'POST',
                url: 'http://localhost:3000/getGrpMsg',
                data: data
            }).then(function sucessCallback(response) {
                $scope.msgs = response.data;
                console.log("fetch sucess  group msgs==>", response);

            },
                function errrCallback(response) {
                    $scope.value = "No users registred.. ";
                    console.log("fetch UnSucessFull ===>", response);
                })
        } catch (e) {
            console.log(e);
        }
    }
    /**
    * @desc invokes when user gets into userDashboard,loads all the users in data base.
    * @param $scope is a cild process of rootSope contains session values
    * @return sucess or failure
    * */

    this.getUserName = ($scope) => {
        let loginDetails = JSON.parse(localStorage.getItem('user'));
        $scope.userEmail = loginDetails.Email;
        $scope.username = loginDetails.firstName
    }
    /**
    * @desc clears all the storage and logsout
    * @return redirect to login page
    * */
    this.logout = () => {
        localStorage.clear;
        $location.path('/');
    }

    /**
    * @desc invokes when user sends msg to other user,takes the data and stores in database
    * @param data contains details about msg.
    * @param $scope is a cild process of rootSope contains session values
    * @return sucess or failure
    * */
    this.storeMsg = ($scope, data) => {
        try {
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
        } catch (e) {
            console.log(e);
        }
    }
    /**
       * @desc invokes user clicks create group
       * @param details contains details about group
       * @param $scope is a cild process of rootSope contains session values
       * @return sucess or failure
       * */

    this.createGrp = (details, $scope) => {
        try {
            $http({
                method: 'POST',
                url: 'http://localhost:3000/createGroup',
                data: details
            }).then(function sucessCallback(response) {
                console.log(response);
                $location.path('/redirect');
            },
                function errrCallback(response) {
                    $scope.error = "Cant create group";
                    console.log("group not created===>", response);
                })

        } catch (e) {
            console.log(e);
        }
    }
});