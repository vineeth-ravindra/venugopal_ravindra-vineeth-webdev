/**
 * Created by Vineeth on 10/10/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController)
        .controller("NewPageController",NewPageController)
        .controller("EditPageController",EditPageController);

        function PageListController($location,$routeParams,PageService,RouteService){
            var vm =this;
            var userId = $routeParams.uid;
            var websiteId = $routeParams.wid;
            vm.clickEvent = clickEvent;
            function init() {
                var promise = PageService.findPageByWebsiteId(websiteId);
                promise
                    .success(function(res){
                        vm.websitePages = res;
                    })
                    .error(function(res){

                    });
            }
            function clickEvent(type,page) {
                if(type==='add'){
                    $location.url(RouteService.getPageNew(userId,websiteId));
                }
                else if(type==='back') {
                    $location.url(RouteService.getWebsiteList(userId));
                }
                else if(type==='profile'){
                    $location.url(RouteService.getProfilePage(userId));
                }
                else if (type==='open') {
                    $location.url(RouteService.getWidgetlist(userId,websiteId,page._id));
                }
                else if(type==='settings') {
                    $location.url(RouteService.getPageEdit(userId,websiteId,page._id));
                }               
                else if(type=='new') {
                        $location.url(RouteService.getPageNew(userId,websiteId));
                }
            }
            init();
        }
        function NewPageController($location,$routeParams,$mdDialog,PageService,RouteService) {
            var vm = this;
            var userId = $routeParams.uid;
            var websiteId = $routeParams.wid;
            vm.clickEvent = clickEvent;
            function init() {
                var promise = PageService.findPageByWebsiteId(websiteId);
                promise
                    .success(function(res){
                        vm.websitePages = res;
                    })
                    .error(function(res){

                    });
            }
            function clickEvent(type,data) {
                if(type==='add'){
                    $location.url(RouteService.getPageNew(userId,websiteId));
                }
                else if(type==='back') {
                    $location.url(RouteService.getPageList(userId,websiteId));
                }
                else if(type==='profile'){
                    $location.url(RouteService.getProfilePage(userId));
                }
                else if (type==='open') {
                    $location.url(RouteService.getWidgetlist(userId,websiteId,data._id));
                }
                else if(type==='settings') {
                    $location.url(RouteService.getPageEdit(userId,websiteId,data._id));
                }               
                else if(type=='new') {
                        $location.url(RouteService.getPageNew(userId,websiteId));
                }
                else if(type==='check'){
                    if (!data || !data.name) {
                        showAllert("Please enter valid data");
                        return;
                    }
                    var promise = PageService.createPage(websiteId, data);
                    promise
                        .success(function(res){
                            $location.url(RouteService.getPageList(userId,websiteId));
                        })
                        .error(function(res){

                        });

                }
            }
            function showAllert(message) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .textContent(message)
                        .ariaLabel(message)
                        .ok('Got it!')
                );
            }
            init();
        }
        function EditPageController($location,$routeParams,PageService,RouteService) {
            var vm = this;
            vm.clickEvent = clickEvent;
            vm.edit ={ name:"",title:""};
            var userId = $routeParams.uid;
            var websiteId = $routeParams.wid;
            var pageId = $routeParams.pid;
            function init() {
                var promise = PageService.findPageByWebsiteId(websiteId);
                promise
                    .success(function(res){
                        vm.websitePages = res;
                    })
                    .error(function(res){

                    });
                var promise2 = PageService.findPageById(pageId);
                promise2
                    .success(function(res){
                        vm.data = res;
                    })
                    .error(function(res){

                    });
            }
            function clickEvent(type,page) {
                if(type==='add'){
                    $location.url(RouteService.getPageNew(userId,websiteId));
                }
                else if(type==='back') {
                    $location.url(RouteService.getPageList(userId,websiteId));
                }
                else if(type==='profile'){
                    $location.url(RouteService.getProfilePage(userId));
                }
                else if (type==='open') {
                    $location.url(RouteService.getWidgetlist(userId,websiteId,page._id));
                }
                else if(type==='settings') {
                    $location.url(RouteService.getPageEdit(userId,websiteId,page._id));
                }               
                else if(type=='new') {
                        $location.url(RouteService.getPageNew(userId,websiteId));
                }
                else if(type==='check'){
                    vm.data.name = vm.edit.name;
                    PageService.updatePage(pageId,vm.data)
                    $location.url(RouteService.getPageList(userId,websiteId));
                }
                else if(type==='delete'){
                    var promise = PageService.deletePage(pageId);
                    promise
                        .success(function(res){
                            $location.url(RouteService.getPageList(userId,websiteId));
                        })
                        .error(function(res){

                        });
                }
            }
            init();
        }

})();


