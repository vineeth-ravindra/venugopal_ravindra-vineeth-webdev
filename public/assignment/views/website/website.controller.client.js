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
                var promise = WebsiteService.findWebsitesByUser(userId);
                promise
                    .success(function(res){
                        vm.userWebsites = res;
                    })
                    .error(function(res){

                    });
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
                var promise = WebsiteService.findWebsitesByUser(userId);
                promise
                    .success(function(res){
                        vm.userWebsites = res;
                    })
                    .error(function(res){

                    });
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
                    if (website) {
                        var promise = WebsiteService.createWebsite(userId, website);
                    promise
                        .success(function (res) {
                            $location.url(RouteService.getWebsiteList(userId));
                        })
                        .error(function (res) {

                        });
                    }
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
                var promise = WebsiteService.findWebsitesByUser(userId);
                promise
                    .success(function(res){
                        vm.userWebsites = res;
                    })
                    .error(function(res){

                    });
                var promise2 = WebsiteService.findWebsiteById(websiteId);
                promise2
                    .success(function(res){
                        vm.currentWebsite = res;
                    })
                    .error(function(){

                    });
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
                        var promise = WebsiteService.updateWebsite($routeParams.wid,website);
                        promise
                            .success(function(res){
                                $location.url(RouteService.getWebsiteList(userId));
                            })
                            .error(function(res){

                            });
                    }

                }
                else if(type==='delete'){
                    var promise = WebsiteService.deleteWebsite($routeParams.wid);
                    promise
                        .success(function(){
                            $location.url(RouteService.getWebsiteList(userId));
                        })
                        .error(function(){

                        });
                }
            }
            init()
        }
})();

