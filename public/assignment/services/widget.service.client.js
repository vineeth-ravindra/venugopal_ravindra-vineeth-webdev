/**
 * Created by Vineeth on 10/10/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);
    function WidgetService(){
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
        var api = {
            "createWidget" : createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;
        function createWidget(widget){
            widgets.push(widget);
        }
        function findWidgetsByPageId(pageId){
            var obj = [];
            for(var i=0;i<widgets.length;i++){
                if(widgets[i].pageId == pageId)
                    obj.push(widgets[i]);
            }
            if(obj.length===0)
                return false;
            else 
                return obj;
        }
        function findWidgetById(widgetId){
            for(var i=0;i<widgets.length;i++){
                if(widgets[i]._id == widgetId)
                    return widgets[i];
            }
            return false;
        }
        function updateWidget(widgetId, widget) {
            var w = findWidgetById(widgetId);
            if(w) {
                w = widget;
            }
            return false;
        }
        function deleteWidget(widgetId) {
            for(var i=0;i<widgets.length;i++){
                if(widgets[i]._id == widgetId)
                    widgets.splice(i,1);
            }
        }
    }
})();
