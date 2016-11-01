/**
 * Created by Vineeth on 10/10/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);
    function UserService($http){
        var api = {
            "createUser" : createUser,
            "findUserById" : findUserById,
            "findUserByUsername":findUserByUsername,
            "findUserByCredentials":findUserByCredentials,
            "updateUser":updateUser,
            "deleteUser":deleteUser
        }
        return api;
        function createUser(user){
            return $http.post("/api/user", user);
        }
        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }
        function findUserByUsername(username){
            var url = '/api/user?username='+username;
            return $http.get(url);
        }
        function findUserByCredentials(username,password) {
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
        }
        function updateUser(userId,user) {
            var url = '/api/user/'+userId;
            return $http.put(url,user);
        }
        function deleteUser(userId) {
            return $http.delete('/api/user/'+userId);
        }
    }
})();