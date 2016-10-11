/**
 * Created by Vineeth on 10/10/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController)
        .controller("EditPageController",EditPageController)
        .controller("NewPageController",NewPageController)

        function PageListController($location,PageService,$routeParams){
            var vm =this;
            var userId = $routeParams.uid;
            var websiteId = $routeParams.wid;
            vm.openWidget = openWidget;
            vm.pageSettingsClicked = pageSettingsClicked;
            vm.backClicked = backClicked;
            vm.addNewClicked = addNewClicked;
            vm.profileClicked = profileClicked;

            function init() {
                vm.websitePages = PageService.findPageByWebsiteId(websiteId);
                console.log(vm.websitePages)
            }
            function pageSettingsClicked(page){
                $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+page._id);
            }
            function openWidget(page) {
                $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+page._id+"/widget");
            }
            function backClicked(){
                $location.url("/user/" +userId +"/website");

            }
            function addNewClicked(){
                $location.url("/user/"+userId+"/website/"+websiteId+"/page/new");
            }
            function profileClicked(){
                $location.url("/user/" +userId);
            }
            init()
        }
        function NewPageController(){

        }
        function EditPageController(){

        }
})();


