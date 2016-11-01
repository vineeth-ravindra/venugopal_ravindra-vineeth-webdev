/**
 * Created by Vineeth on 10/10/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);
    function WebsiteService($http){
        var website = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];
        var api = {
            "createWebsite" : createWebsite,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        }
        return api;
        function createWebsite(userId,site){
            return $http.post("/api/user/"+userId+"/website",site);
        }
        function findWebsitesByUser(userId){
            return $http.get("/api/user/"+userId+"/website");
        }
        function findWebsiteById(websiteId){
            return $http.get("/api/website/"+websiteId);
        }
        function updateWebsite(websiteId,website) {
            return $http.put("/api/website/"+websiteId,website);
        }
        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
        }
    }
})();