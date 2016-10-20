/**
 * Created by Vineeth on 10/10/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController",NewWebsiteController)
        .controller("EditWebsiteController",EditWebsiteController)

        function WebsiteListController($routeParams,$location,WebsiteService,RouteService) {
            var vm = this;
            var userId = $routeParams.uid;
            vm.clickEvent = clickEvent;
            function init() {
                vm.userWebsites = WebsiteService.findWebsitesByUser(userId);
            }
            function clickEvent(type,website) {
                if(type==='add'){
                    $location.url(RouteService.getWebsiteNew(userId));
                }
                else if(type==='settings') {
                    $location.url(RouteService.getWebsiteEdit(userId,website._id));
                }
                else if (type==='open'){
                    $location.url(RouteService.getPageList(userId,website._id))
                }
                else if(type==='back'){
                    $location.url(RouteService.getProfilePage(userId));
                }
                else if(type==='profile'){
                    $location.url(RouteService.getProfilePage(userId));
                }
            }
            init();
        }
        function NewWebsiteController($routeParams,$location,WebsiteService,RouteService){
            var vm = this;
            var userId = $routeParams.uid;
            vm.clickEvent = clickEvent;
            function init() {
                vm.userWebsites = WebsiteService.findWebsitesByUser(userId);
            }
            function clickEvent(type,website) {
                if(type==='add'){
                    $location.url(RouteService.getWebsiteNew(userId));
                }
                else if(type==='settings') {
                    $location.url(RouteService.getWebsiteEdit(userId,website._id));
                }
                else if (type==='open') {
                    $location.url(RouteService.getPageList(userId,website._id))
                }
                else if(type==='back') {
                    $location.url(RouteService.getWebsiteList(userId));
                }
                else if(type==='profile'){
                    $location.url(RouteService.getProfilePage(userId));
                }
                else if(type=='new') {
                    if(website)
                        WebsiteService.createWebsite(userId,website);
                        $location.url(RouteService.getWebsiteList(userId));
                }
            }
            init()

        }
        function EditWebsiteController($routeParams,$location,WebsiteService,RouteService){
            var vm =this;
            var userId = $routeParams.uid;
            var websiteId = $routeParams.wid;
            vm.clickEvent = clickEvent;
            function init() {
                vm.userWebsites = WebsiteService.findWebsitesByUser(userId);
                vm.currentWebsite = WebsiteService.findWebsiteById(websiteId);
            }
            function clickEvent(type,website) { 
                if(type==='add'){
                    $location.url(RouteService.getWebsiteNew(userId));
                }
                else if(type==='settings') {
                    $location.url(RouteService.getWebsiteEdit(userId,website._id));
                }
                else if (type==='open') {
                    $location.url(RouteService.getPageList(userId,website._id))
                }
                else if(type==='back') {
                    $location.url(RouteService.getWebsiteList(userId));
                }
                else if(type==='profile'){
                    $location.url(RouteService.getProfilePage(userId));
                }
                else if(type==='edit') {
                    if(website){
                        WebsiteService.updateWebsite($routeParams.wid,website);
                    }
                    $location.url(RouteService.getWebsiteList(userId));
                }
                else if(type==='delete'){
                    WebsiteService.deleteWebsite($routeParams.wid);
                    $location.url(RouteService.getWebsiteList(userId));  
                }
            }
            init()
        }
})();

