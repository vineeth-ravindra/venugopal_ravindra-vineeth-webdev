/**
 * Created by Vineeth on 11/28/16.
 */
/**
 * Created by Vineeth on 10/11/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("FlickerImageSearchController",FlickerImageSearchController)

    function FlickerImageSearchController($routeParams,$location,$sce,WidgetService,RouteService,FlickerService) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;
        vm.widgitId = $routeParams.wgid;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;
        vm.pageId = $routeParams.pid;
        vm.clickEvent = clickEvent;
        function init() {
            var promise = WidgetService.findWidgetById(vm.widgitId);
            promise
                .success(function (res) {
                    vm.widget = res;
                })
                .error(function (res) {

                });
        }
        init();
        function searchPhotos(searchTerm) {
            FlickerService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }
        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/"
                + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";
            vm.widget.url = url;
            WidgetService
                .updateWidget( vm.widgitId, vm.widget)
                    .success(function(succ) {

                        $location.url(RouteService.getWidgetedit(vm.userId,vm.websiteId,vm.pageId,vm.widget._id));
                    })
                .error(function (err) {
                    console.log("Error at Flicker download");
                });
        }
        function clickEvent(type,data){
            if(type==='back') {
                $location.url(RouteService.getWidgetlist(vm.userId,vm.websiteId,vm.pageId));
            }
            else if(type==='profile'){
                $location.url(RouteService.getProfilePage(vm.userId));
            }
        }
    }
})();
