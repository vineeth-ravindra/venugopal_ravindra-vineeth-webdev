/**
 * Created by Vineeth on 10/10/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController",NewWebsiteController)
        .controller("EditWebsiteController",EditWebsiteController)

        function WebsiteListController(WebsiteService,$routeParams,$location) {
            var vm =this;
            var userId = $routeParams.uid;
            vm.openPage = openPage;
            vm.webSiteSettings = webSiteSettings;
            vm.backClicked = backClicked;
            vm.addNewClicked = addNewClicked;
            vm.profileClicked = profileClicked;
            function init() {
                vm.userWebsites = WebsiteService.findWebsitesByUser(userId);
            }
            function webSiteSettings(website){
                $location.url("/user/"+userId+"/website/"+website._id);
            }
            function openPage(website) {
                $location.url("/user/"+userId+"/website/"+website._id+"/page");
            }
            function backClicked(){
                $location.url("/user/" +userId);
            }
            function addNewClicked(){
                $location.url("/user/"+userId+"/website/new");
            }
            function profileClicked(){
                $location.url("/user/" +userId);
            }
            init()
        }
        function NewWebsiteController(WebsiteService,$routeParams,$location){
            var vm =this;
            var userId = $routeParams.uid;
            vm.openPage = openPage;
            vm.webSiteSettings = webSiteSettings;
            vm.backClicked = backClicked;
            vm.addNewClicked = addNewClicked;
            vm.profileClicked = profileClicked;
            vm.checkClicked = checkClicked;

            function init() {
                vm.userWebsites = WebsiteService.findWebsitesByUser(userId);
            }
            function webSiteSettings(website){
                $location.url("/user/"+userId+"/website/"+website._id);
            }
            function openPage(website) {
                $location.url("/user/"+userId+"/website/"+website._id+"/page");
            }
            function backClicked(){
                $location.url("/user/" +userId +"/website");
            }
            function addNewClicked(){
                $location.url("/user/"+userId+"/website/new");
            }
            function profileClicked(){
                $location.url("/user/" +userId);
            }
            function checkClicked(newWebsite){
                WebsiteService.createWebsite(userId,newWebsite);
                $location.url("/user/" +userId +"/website");
            }
            init()

        }
        function EditWebsiteController(WebsiteService,$routeParams,$location){
            var vm =this;
            var userId = $routeParams.uid;
            vm.openPage = openPage;
            vm.webSiteSettings = webSiteSettings;
            vm.backClicked = backClicked;
            vm.addNewClicked = addNewClicked;
            vm.profileClicked = profileClicked;
            vm.checkClicked = checkClicked;
            vm.deleteClicked = deleteClicked;

            function init() {
                vm.userWebsites = WebsiteService.findWebsitesByUser(userId);
            }
            function webSiteSettings(website){
                $location.url("/user/"+userId+"/website/"+website._id);
            }
            function openPage(website) {
                $location.url("/user/"+userId+"/website/"+website._id+"/page");
            }
            function backClicked(){
                $location.url("/user/" +userId +"/website");
            }
            function addNewClicked(){
                console.log("Hel");
                $location.url("/user/"+userId+"/website/new");
            }
            function profileClicked(){
                $location.url("/user/" +userId);
            }
            function checkClicked(newWebsite) {
                WebsiteService.updateWebsite($routeParams.wid,newWebsite);
                $location.url("/user/" +userId +"/website");
            }
            function deleteClicked(newWebsite){
                WebsiteService.deleteWebsite($routeParams.wid);
                $location.url("/user/" +userId +"/website");
            }
            init()
        }
})();