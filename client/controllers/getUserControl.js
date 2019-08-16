app.controller("listUsers", function ($scope, servicesLogin, SocketService) {
    servicesLogin.getUserName($scope);
    servicesLogin.getUsers($scope);
    try {
        SocketService.on('updateList', (updatemsg) => {
            console.log(updatemsg.msg)
            console.log("event hit to update list (get msg)");
            // console.log(updatemsg.data.msg);
            $scope.msgs.push(updatemsg);
            console.log(" msgs after update----->", $scope.msgs);
        })
    } catch (e) {
        console.log(e);
    }

    $scope.startchat = (value) => {
        $scope.value = value;

        servicesLogin.getMsg($scope, value);

    }
    $scope.logout = () => {
        localStorage.clear();
        servicesLogin.logout();
    }
    $scope.storeMsg = () => {

        let msgboth = JSON.parse(localStorage.getItem('msgData'));
        // console.log($scope.msg);
        let data = {
            "from": msgboth.from,
            "to": msgboth.to,
            "msg": $scope.msg
        }
        console.log("scope value", $scope.value);
        servicesLogin.getMsg($scope, $scope.value);
        SocketService.emit("message", data);

        console.log("msg sent ==>", data);
        // servicesLogin.storeMsg($scope, data);

    }
});


