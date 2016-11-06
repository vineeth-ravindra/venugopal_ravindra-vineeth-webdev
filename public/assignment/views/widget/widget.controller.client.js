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
        var vm = this;
        var widgitId = $routeParams.wgid;
        var websiteId = $routeParams.wid;
        var userId = $routeParams.uid;
        var pageId = $routeParams.pid;
        vm.widgitId = $routeParams.wgid;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;
        vm.pageId = $routeParams.pid;
        vm.clickEvent = clickEvent;

        function init() {
            var promise = WidgetService.findWidgetById(widgitId);
            promise
                .success(function (res) {
                    vm.widget = res;
                })
                .error(function (res) {

                });
        }
        init();

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
                var widget = createWidget(data);
                console.log(widget);
                var promise = WidgetService.createWidget(widget,pageId);
                promise
                    .success(function(res){
                        $location.url(RouteService.getWidgetedit(userId,websiteId,pageId,widget._id));
                    })
                    .error(function(){

                    });
            }
        }
        function createWidget(widgetType) {
            widgetType = widgetType.toLowerCase();
            if(widgetType==="header"){
                return {
                    "_id": Math.floor(Math.random()*999).toString(),
                    "widgetType": "HEADER",
                    "pageId" :pageId,
                    "size" : 0,
                    "text": ""
                }
            }
            if(widgetType==="youtube"){
                return {
                    "_id": Math.floor(Math.random()*999).toString(),
                    "widgetType": "YOUTUBE",
                    "pageId" :pageId,
                    "width" : "",
                    "url": ""
                }
            }
            if(widgetType==="image"){
                return {
                    "_id": Math.floor(Math.random()*999).toString(),
                    "widgetType": "IMAGE",
                    "pageId" :pageId,
                    "width" : "",
                    "url": ""
                }
            }
        }
    }
})();
