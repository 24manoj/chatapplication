
app.controller("listUsers", function ($scope, $location, servicesLogin, SocketService) {
    var members = [];
    servicesLogin.getUserName($scope);
    servicesLogin.getUsers($scope);
    // var value1 = JSON.parse(localStorage.getItem('msgData'));
    // console.log("in controler1==>", value1);
    // servicesLogin.getMsges($scope, value1);

    // console.log("emiting in controler", $scope.msgs);
    // SocketService.emit('updateList', ($scope.msgs));
    try {
        SocketService.on('updateList', (updatemsg) => {
            console.log("updatge==>", updatemsg)
            console.log("event hit to update list ");
            // console.log(updatemsg.data.msg);
            $scope.msgs.push(updatemsg);
            console.log(" msgs after update----->", $scope.msgs);
        })
    } catch (e) {
        console.log(e);
    }

    $scope.person = (value) => {
        $scope.value = value;
        servicesLogin.getMsg($scope, value);

    }
    $scope.logout = () => {
        localStorage.clear();
        servicesLogin.logout();
    }
    $scope.storeMsg = () => {

        let msgboth = JSON.parse(localStorage.getItem('msgData'));
        console.log("msg value in getcontoler", msgboth);
        let data = {
            "from": $scope.userEmail,
            "to": msgboth.to,
            "msg": $scope.msg
        }
        SocketService.emit("message", data);
        console.log($scope.userEmail)
        console.log("scope value", $scope.value);
        // servicesLogin.getMsg($scope, $scope.value);
        console.log("msg sent ==>", data);
        // servicesLogin.storeMsg($scope, data);

    }
    $scope.personAdd = (value) => {

        console.log("IN GROup Creation ", value.Email);


        members.push(value.Email);
        console.log(members);
        $scope.members = members;



    }
    $scope.groupcreate = () => {
        console.log("in create group");
        $location.path("/groupChat");
    }
    $scope.redirect = () => {
        if ($scope.groupName != null)
            $location.path("/redirect");
        else {
            $scope.error = "Enter Group Name";
        }
    }

    $scope.createGrp = () => {

        if ($scope.groupName == null) {
            $scope.error = "Enter Name for Group";
        } else {
            $scope.groupdetails = {
                members: $scope.members,
                groupName: $scope.groupName
            }

            servicesLogin.createGrp($scope.groupdetails);
        }
    }


});


