/**
 * Created by Vineeth on 10/11/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController)
        .controller("EditWidgetController",EditWidgetController)
        .controller("NewWidgetController",NewWidgetController)
        function WidgetListController($routeParams,$location,$sce,WidgetService,RouteService) {
            var vm = this;
            var pageId = $routeParams.pid;
            var userId = $routeParams.uid;
            var websiteId = $routeParams.wid;
            vm.checkSafeUrlYoutube = checkSafeUrlYoutube;
            vm.checkSafeHtml = checkSafeHtml;
            vm.checkSafeUrlImage = checkSafeUrlImage;
            vm.clickEvent = clickEvent;
            function init(){
                vm.widgetList = WidgetService.findWidgetsByPageId(pageId);
            }
            function checkSafeHtml(html) {
                return $sce.trustAsHtml(html);
            }
            function checkSafeUrlYoutube(url) {
                var parts = url.split('/');
                var id = parts[parts.length - 1];
                url = "https://www.youtube.com/embed/"+id;
                return $sce.trustAsResourceUrl(url);
            }
            function checkSafeUrlImage(url) {
                var ret =  $sce.trustAsResourceUrl(url);
                return ret;
            }
            function clickEvent(type,data){
                if(type==='edit') {
                    $location.url(RouteService.getWidgetedit(userId,websiteId,pageId,data._id));
                }
                else if(type==='back'){
                    $location.url(RouteService.getPageList(userId,websiteId));
                }
                else if(type==='add'){
                    $location.url("RouteService.getwidgetChooser(userId,websiteId,pageId)");
                }
                else if(type==='profile'){
                    $location.url(RouteService.getProfilePage(userId));
                }
            }
            init();
        }
        function EditWidgetController($routeParams,$location,$sce,WidgetService,RouteService) {
            var vm = this;
            var widgitId = $routeParams.wgid;
            var websiteId = $routeParams.wid;
            var userId = $routeParams.uid;
            var pageId = $routeParams.pid;
            vm.widget = WidgetService.findWidgetById(widgitId);
            vm.clickEvent = clickEvent;
            function clickEvent(type,data){
                if(type==='back') {
                    $location.url(RouteService.getWidgetlist(userId,websiteId,pageId));
                }
                else if(type==='profile'){
                    $location.url(RouteService.getProfilePage(userId));
                }
                else if(type==='check'){
                    WidgetService.updateWidget(widgitId,vm.widget);
                    $location.url(RouteService.getWidgetlist(userId,websiteId,pageId));
                }
                else if(type==='delete'){
                    WidgetService.deleteWidget(widgitId);
                    $location.url(RouteService.getWidgetlist(userId,websiteId,pageId));
                }
            }
        }
        function NewWidgetController($routeParams,$location,$sce,WidgetService,RouteService) {
            var vm = this;
            var websiteId = $routeParams.wid;
            var userId = $routeParams.uid;
            var pageId = $routeParams.pid;
            vm.clickEvent = clickEvent;
            function clickEvent(type,data){
                if(type==='back'){
                    $location.url(RouteService.getWidgetlist(userId,websiteId,pageId));
                }
                if(type==='profile'){
                    $location.url(RouteService.getProfilePage(userId));
                }
            }
        }
})();


