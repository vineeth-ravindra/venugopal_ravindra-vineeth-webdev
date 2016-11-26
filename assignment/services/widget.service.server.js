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
    (function () {models.widgetModel.setModel(models);})();

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

    function createWidget(req,res) {
        var widget = req.body;
        models.widgetModel.createWidget(widget._page,widget)
            .then(function (widgetObj) {
                models.pageModel.findPageById(widget._page)
                    .then(function (pageObj) {
                        pageObj = pageObj[0];
                        pageObj.widgets.push(widgetObj._id);
                        pageObj.save();
                        res.send(widgetObj);
                    },function (err) {
                        res.sendStatus(404).send(err);
                    });
            },function (err) {
                res.sendStatus(404).send(err);
        });
    }
    function findAllWidgetsForPage(req,res){
        var pageId = req.params.pageId;
        models.pageModel.findAllWidgets(pageId)
            .then(function (wids) {
                res.send(wids.widgets);
            },function (err) {
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
        models.widgetModel.findWidgetById(widgetId)
            .then(function (widgetObj) {
                widgetObj = widgetObj[0];
                pageId = widgetObj._page;
                models.widgetModel.deleteWidget(widgetId)
                    .then(function(succ){
                        models.pageModel.findPageById(pageId)
                            .then(function (pageObj) {
                                pageObj = pageObj[0];
                                for(var i=0;i<pageObj.widgets.length;i++) {
                                    if (pageObj.widgets[i] == widgetId) {
                                        pageObj.widgets.splice(i, 1);
                                        break;
                                    }
                                }
                                pageObj.save();
                                res.send("ok");
                            },function (err) {
                                res.sendStatus(404).send(err);
                            });
                    },function(err){
                        res.sendStatus(404).send(err);
                    });
            });
    }
    function sort(req,res) {
        var pageId = req.params.pageId;
        var start  = req.query.initial;
        var end = req.query.final;
        models.widgetModel.reorderWidget(pageId,start,end)
            .then(function (page) {
                page = page[0];
                var widgets = page.widgets;
                var temp = widgets.splice(start,1)[0];
                widgets.splice(end,0,temp);
                page.widgets=widgets;
                page.save();
                res.sendStatus(200);
            },function (err) {
                res.sendStatus(404).send(err);
        });
    }

}