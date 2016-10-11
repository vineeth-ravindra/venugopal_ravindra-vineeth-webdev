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
            "createUser" : createUser,
            "findUserById" : findUserById,
            "findUserByUsername":findUserByUsername,
            "findUserByCredentials":findUserByCredentials,
            "updateUser":updateUser,
            "deleteUser":deleteUser
        }
        return api;
        function trimUser(user){
            user.username = user.username.trim();
            user.firstName = user.firstName.trim();
            user.lastName = user.lastName.trim();
            return user;
        }
        function createUser(user){
            user = trimUser(user);
            for(i=0;i<users.length;i++){
                if(users[i].username === user.username)
                    return false;
            }
            users.push(user);
        }
        function findUserById(userId){
            for(var i=0;i<users.length;i++){
                if(users[i]._id == userId)
                    return users[i];
            }
            return false;
        }
        function findUserByUsername(userName){
            for(var i=0;i<users.length;i++){
                if(users[i].username == userName)
                    return users[i];
            }
            return false;
        }
        function findUserByCredentials(username,password) {
            var user = findUserByUsername(username);
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