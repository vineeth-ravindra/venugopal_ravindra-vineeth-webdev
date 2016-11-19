/**
 * Created by Vineeth on 11/1/16.
 */
module.exports = function(app,models) {
    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.put("/page/:pageId/widget",sort);
    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname+'/../../public/assignment/uploads'});
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        var widgetId      = req.body.widgetId;
        updateImageWidget(widgetId,req.file.filename);
        res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
    }
    function updateImageWidget(widgetId,filename) {
        models.widgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                widget = widget[0];
                widget.url = "uploads/"+filename;
                models.widgetModel.updateWidget(widgetId,widget)
                    .then(function (succ) {
                        return;
                    },function(err){
                        return;
                });
            });
    }
    function createWidget(req,res){
        var widget = req.body;
        models.widgetModel.findAllWidgetsForPage(widget.pageId)
            .then(function(pageWidgets){
                var count = pageWidgets.length;
                widget.pos = count;
                models.widgetModel.createWidget(widget)
                    .then(function(succ){
                        res.send(succ);
                    },function(err){
                        res.sendStatus(404).send(err);
                });
            },function (err){

        });
    }
    function findAllWidgetsForPage(req,res){
        var pageId = req.params.pageId;
        models.widgetModel.findAllWidgetsForPage(pageId)
            .then(function(succ){
                res.send(succ);
            },function(err){
                res.sendStatus(404).send(err);
        });
    }
    function findWidgetById(req,res){

        var widgetId = req.params.widgetId;
        models.widgetModel.findWidgetById(widgetId)
            .then(function (succ) {
                if(succ.length>0)
                    res.send(succ[0]);
                else
                    res.send("0");
            },function (err) {
                res.sendStatus(0).send(err)
        });
    }
    function updateWidget(req,res){
        var widgetId = req.params.widgetId;
        var widget = req.body;
        models.widgetModel.updateWidget(widgetId,widget)
            .then(function (succ) {
                res.send("ok");
            },function (err) {
                res.sendStatus(404).send(err);
        });
    }
    function deleteWidget(req,res) {
        var widgetId = req.params.widgetId;
        models.widgetModel.deleteWidget(widgetId)
            .then(function (succ) {
                res.send("ok");
            },function (err) {
                res.sendStatus(404).send(err);
        });
    }
    function sort(req,res) {
        var startIndex  = req.query.initial;
        var endIndex = req.query.final;
        models.widgetModel.findWidgetByPos(startIndex)
            .then(function(widget1){
                widget1 = widget1[0];
                models.widgetModel.findWidgetByPos(endIndex)
                    .then(function (widget2) {
                        widget2 = widget2[0];
                        widget1.pos = endIndex;
                        widget2.pos = startIndex;
                        insertAfterSort(widget1,widget2);
                    });
            });
    }
    function insertAfterSort(widget1,widget2){
        console.log(widget1);
        console.log(widget2);
        models.widgetModel.updateWidget(widget1.id,widget1)
            .then(function (succ) {
                console.log("First Inserted")
            },function (err) {
                console.log("Error1");
            });
        models.widgetModel.updateWidget(widget2.id,widget2)
            .then(function (succ) {
                console.log("Second Inserted")
            },function (err) {
                console.log("Error2");
            });
    }
}