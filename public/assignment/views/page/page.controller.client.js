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
                vm.websitePages = PageService.findPageByWebsiteId(websiteId);
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
                vm.websitePages = PageService.findPageByWebsiteId($routeParams.wid);
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
                    $location.url(RouteService.getWidgetlist(userId,websiteId,page._id));
                }
                else if(type==='settings') {
                    $location.url(RouteService.getPageEdit(userId,websiteId,page._id));
                }               
                else if(type=='new') {
                        $location.url(RouteService.getPageNew(userId,websiteId));
                }
                else if(type==='check'){
                    if (!data || !data.name) {
                    showAllert("Please enter valid data");
                    return;
                    }
                    PageService.createPage(websiteId, data);
                    $location.url(RouteService.getPageList(userId,websiteId));
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
            var userId = $routeParams.uid;
            var websiteId = $routeParams.wid;
            var pageId = $routeParams.pid;
            function init() {
                vm.websitePages = PageService.findPageByWebsiteId($routeParams.wid);
                vm.data = PageService.findPageById(pageId);
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
                    PageService.updatePage(pageId,vm.data)
                    $location.url(RouteService.getPageList(userId,websiteId));
                }
                else if(type==='delete'){
                    PageService.deletePage(pageId);
                    $location.url(RouteService.getPageList(userId,websiteId));
                }
            }
            init();
        }

})();


