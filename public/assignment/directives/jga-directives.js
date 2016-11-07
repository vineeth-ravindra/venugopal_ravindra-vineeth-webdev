/**
 * Created by Vineeth on 11/6/16.
 */

(function () {
    angular
        .module("jgaDirectives", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable() {
        function linker(scope, element, attributes) {
            var start = -1;
            var end = -1;
            element
                .sortable({
                    start   : function (event, ui) {
                        start = ($(ui.item).index());
                    },
                    stop    : function (event, ui) {
                        end = ($(ui.item).index());
                        scope.sortableController.rearrange(start, end);
                    }
                });
        }

        return {
            scope: {},
            link: linker,
            controller: sortableController,
            controllerAs: 'sortableController'
        };
    }
    function sortableController(WidgetService,$routeParams){
        var vm = this;
        vm.rearrange  = rearrange;
        function rearrange(start, end){
            var pageId = $routeParams.pid;
            WidgetService.rearrange(pageId,start,end)
                .success(function(res){

                })
                .error(function(res){

                });
        }
    }
})();