/**
 * Created by Vineeth on 10/10/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);
    function UserService(){
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api = {
            "createUser" : "createUser",
            "findUserById" : "findUserById",
            "findUserByName":"findUserName",
            "findUserByCredential":"findUserByCredential",
            "updateUser":"UpdateUser",
            "deleteUser":"deleteUser"
        }
        return api;
        function createUser(user){
            users.push(user);
        }
        function getUserbyId(userId){
            for(var i=0;i<users.length;i++){
                if(users[i]._id == userId)
                    return users[i];
            }
            return false;
        }
        function findUserByUserName(userName){
            for(var i=0;i<users.length;i++){
                if(users[i]._id == userId)
                    return users[i];
            }
            return false;
        }
        function findUserByCredentials(username,password) {
            var user = findUserByUserName(username);
            if(user) {
                if(user.password == password)
                    return user;
            }
            return false;
        }
        function updateUser(userId,user) {
            var u = getUserbyId(userId);
            if(user) {
                u = user;
            }
            return false;
        }
        function deleteUser(user) {
            for(var i=0;i<users.length;i++){
                if(users[i]._id == userId)
                    users.splice(i,1);
            }
        }
    }
})();