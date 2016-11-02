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
            var promise = WidgetService.findWidgetsByPageId(pageId);
            promise
                .success(function(res){
                    vm.widgetList = res;
                })
                .error(function(res){

                });
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
                $location.url(RouteService.getwidgetChooser(userId,websiteId,pageId));
            }
            else if(type==='profile'){
                $location.url(RouteService.getProfilePage(userId));
            }
        }
        init();
    }
    function EditWidgetController($routeParams,$location,$sce,WidgetService,RouteService) {
        console.log("Hello");
        var vm = this;
        var widgitId = $routeParams.wgid;
        var websiteId = $routeParams.wid;
        var userId = $routeParams.uid;
        var pageId = $routeParams.pid;
        vm.clickEvent = clickEvent;

        if (widgitId.match("^new")) {
            widgitId = widgitId.split("-");
            vm.widget = {
                widgetType: widgitId[1]
            }
            widgitId = -1;
            vm.createNew = true;
        }
        else {
            var promise = WidgetService.findWidgetById(widgitId);
            promise
                .success(function (res) {
                    vm.widget = res;
                    vm.createNew = false;
                })
                .error(function (res){

                });
        }
        function clickEvent(type,data){
            if(type==='back') {
                $location.url(RouteService.getWidgetlist(userId,websiteId,pageId));
            }
            else if(type==='profile'){
                $location.url(RouteService.getProfilePage(userId));
            }
            else if(type==='check') {
                if(widgitId===-1) {
                    widget = createWidget();
                    var promise = WidgetService.createWidget(widget);
                    promise
                        .success(function(res){

                        })
                        .error(function(res){

                        });
                }
                else {
                    var promise = WidgetService.updateWidget(widgitId, vm.widget);
                    promise
                        .success(function (res) {

                        })
                        .error(function(res){

                        });
                }
                $location.url(RouteService.getWidgetlist(userId,websiteId,pageId));
            }
            else if(type==='delete'){
                var promise = WidgetService.deleteWidget(widgitId);
                promise
                    .success(function(){
                        $location.url(RouteService.getWidgetlist(userId,websiteId,pageId));
                    })
                    .error(function(res){

                    });
            }
        }
        function createWidget() {
            if(vm.widget.widgetType.toLowerCase()==="header"){
                return {
                    "_id": Math.floor(Math.random()*999).toString(),
                    "widgetType": "HEADER",
                    "pageId" :pageId,
                    "size" : vm.widget.size,
                    "text": vm.widget.text
                }
            }
            if(vm.widget.widgetType.toLowerCase()==="youtube"){
                return {
                    "_id": Math.floor(Math.random()*999).toString(),
                    "widgetType": "YOUTUBE",
                    "pageId" :pageId,
                    "width" : vm.widget.width,
                    "url": vm.widget.url
                }
            }
            if(vm.widget.widgetType.toLowerCase()==="image"){
                return {
                    "_id": Math.floor(Math.random()*999).toString(),
                    "widgetType": "IMAGE",
                    "pageId" :pageId,
                    "width" : vm.widget.width,
                    "url": vm.widget.url
                }
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
            else if(type==='profile'){
                $location.url(RouteService.getProfilePage(userId));
            }
            else if(type==='listItem') {
                handleListEvent(data);
            }
        }
        function handleListEvent(data){
            if(data==='HEADER'){
                $location.url(RouteService.getWidgetedit(userId,websiteId,pageId,"new-header"));
            }
            else if(data==='YOUTUBE'){
                $location.url(RouteService.getWidgetedit(userId,websiteId,pageId,"new-youtube"));
            }
            else if(data==='IMAGE'){
                $location.url(RouteService.getWidgetedit(userId,websiteId,pageId,"new-image"));
            }
        }
    }
})();
