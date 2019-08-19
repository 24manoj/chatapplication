
/**
* @desc is a controler function ,contains all opertions to perform on resetPassword
* @param listUsers,invokes when  user login is sucess
* @param $scope ,inheriates the parent process $rootScope,which can be used throught this session.
* @param servicesLogin,creting an service contoler for logincontrol.
* @param $location,is a global scope,used to redirect the pages.
* @param SocketService is a function,return scoket connection
*/
app.controller("listUsers", function ($scope, $location, servicesLogin, SocketService) {
    var members = [];
    var member = [];
    servicesLogin.getUserName($scope);
    servicesLogin.getUsers($scope);
    /** emiting the socket event*/
    SocketService.emit("getGrops", $scope.userEmail);
    //catching the Emited socket event
    SocketService.on("updateGrops", (data) => {
        // console.log(data);
        try {
            data.forEach(ele => {
                let key = Object.keys(ele);
                key.forEach(keyele => {
                    if (keyele == "creator") {
                        $scope.creator = ele[keyele];
                        $scope.membersEmail = ele["membersEmail"];
                    }
                });

            })
            if ($scope.userEmail == $scope.creator) {
                $scope.members = $scope.membersEmail
            }
            else {
                if ($scope.membersEmail.includes($scope.userEmail)) {
                    member.push($scope.creator);
                    $scope.membersEmail.forEach(Element => {
                        if (Element != $scope.userEmail) {
                            member.push(Element)
                        }
                        $scope.members = member;
                        console.log("Scope memeberzs in non grp creator", $scope.members)
                    })
                }
            }
            $scope.groups = data;
            console.log("emit catched Sucessfuly");
        } catch (e) {
            console.log(e);
        }
    });

    try {
        SocketService.on('updateList', (updatemsg) => {
            $scope.msgs.push(updatemsg);
            console.log(" msgs after update----->", $scope.msgs);
        })
    } catch (e) {
        console.log(e);
    }

    try {
        SocketService.on('updateGropsMsgs', (updatemsg) => {
            console.log("updated msg==>", updatemsg)
            console.log("event hit to update list ");
            $scope.msgs.push(updatemsg);
            console.log(" msgs after update----->", $scope.msgs);
        })
    } catch (e) {
        console.log(e);
    }
    /**
     * @desc invokes when user clicks on a person to chat
     * @param value details of user,to chat with
     * @return invokes services.getMsg
     */
    $scope.person = (value) => {
        try {
            $scope.value = value;
            servicesLogin.getMsg($scope, value);
        } catch (e) {
            console.log(e);
        }
    }
    /**
    * @desc invokes when user click on group
    * @param value details of group
    * @return invokes services.getGrpMsg
    */
    $scope.GrpPerson = (value) => {
        try {
            $scope.grpPerson = value;
            servicesLogin.getGrpMsg($scope, value);
        } catch (e) {
            console.log(e);
        }
    }
    /**
    * @desc invokes when user clicks logout,clears localstorage 
    * @param null,
    * @return invokes services.logout
    */
    $scope.logout = () => {
        try {
            localStorage.clear();
            servicesLogin.logout();
        } catch (e) {
            console.log(e);
        }
    }
    /**
    * @desc invokes when user click send msg
    * @param null,
    * @return emits the socket connection
    */
    $scope.storeMsg = () => {
        try {
            let msgboth = JSON.parse(localStorage.getItem('msgData'));
            if (msgboth.groupName != null) {
                let data = {
                    "from": $scope.userEmail,
                    "groupName": msgboth.groupName,
                    "membersEmail": $scope.members,
                    "msg": $scope.msg
                }
                SocketService.emit("storeGrpMsg", data);
                console.log("msg sent ==>", data);
            }
            else {
                console.log("msg value in getcontoler", msgboth);
                let data = {
                    "from": $scope.userEmail,
                    "to": msgboth.to,
                    "msg": $scope.msg
                }
                SocketService.emit("message", data);
                console.log("msg sent ==>", data);
            }
        } catch (e) {
            console.log(e);
        }
    }
    /**
    * @desc invokes when user creates a group of people
    * @param value,contains  each persons details
    * @return nothing 
    * */
    $scope.personAdd = (value) => {
        console.log("IN GROup Creation ", value.Email);
        if (members.length <= 5 && !members.includes(value.Email)) {
            members.push(value.Email);
            console.log(members);
            $scope.members = members;
        } if (member.length == 5) {
            members = [];
            $scope.error = "5 people maximum in group";
        }
    }

    /**
    * @desc invokes when user creates a group
    * @param null,
    * @return redirect to sepecified location
    */
    $scope.groupcreate = () => {
        console.log("in create group");
        $location.path("/groupChat");
    }
    /**
    * @desc invokes when user sucessfully creates group
    * @param null,
    * @return redirect back to userDashBoard
    */
    $scope.redirect = () => {

        if ($scope.groupName != null)
            $location.path("/redirect");
        else {
            $scope.error = "Enter Group Name";
        }
    }
    /**
        * @desc invokes when user creates group
        * @param null,
        * @return invokes serverLogin.createGrp
        */
    $scope.createGrp = () => {
        if ($scope.groupName == null) {
            $scope.error = "Enter Name for Group";
        }
        else if ($scope.members == null) {
            $scope.error = "Add memebers to group";
        } else {
            $scope.groupdetails = {
                creator: $scope.userEmail,
                members: $scope.members,
                groupName: $scope.groupName
            }
            servicesLogin.createGrp($scope.groupdetails, $scope);
        }
    }
});


