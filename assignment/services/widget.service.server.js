/**
 * Created by Vineeth on 11/1/16.
 */
module.exports = function(app) {
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
    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    function createWidget(req,res){
        var widget = req.body;
        widgets.push(widget);
        res.send("ok");
    }
    function findAllWidgetsForPage(req,res){
        var pageId = req.params.pageId;
        var obj = [];
        for(var i=0;i<widgets.length;i++){
            if(widgets[i].pageId == pageId)
                obj.push(widgets[i]);
        }
        res.send(obj);
    }
    function findWidgetById(req,res){
        var widgetId = req.params.widgetId;
        for(var i=0;i<widgets.length;i++){
            if(widgets[i]._id == widgetId) {
                res.send(widgets[i]);
                return;
            }
        }
        res.send("0")
    }
    function updateWidget(req,res){
        var widgetId = req.params.widgetId;
        for(var i=0;i<widgets.length;i++){
            if(widgets[i]._id == widgetId) {
                widgets[i] = widget;
                break;
            }
        }
        res.send("ok");
    }
    function deleteWidget(req,res) {
        var widgetId = req.params.widgetId;
        for(var i=0;i<widgets.length;i++){
            if(widgets[i]._id == widgetId){
                widgets.splice(i,1);
                break;
            }
        }
        res.send("ok");
    }
}