/**
 * Created by Vineeth on 11/1/16.
 */
module.exports = function(app,models) {
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/page/:pageId",findPageById);
    app.delete("/api/page/:pageId",deletePage);
    app.put("/api/page/:pageId",updatePage);
    (function(){models.pageModel.setModel(models);})();

    function findAllPagesForWebsite(req,res) {
        var websiteId = req.params.websiteId;
        models.pageModel.findAllPagesForWebsite(websiteId)
            .then(function(succ){
                res.send(succ);
            },function(err){
                res.sendStatus(404).send(err);
        });
    }
    function createPage(req,res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        var obj = {};
        obj.name = page.name;
        obj.websiteId = websiteId;
        page.websiteId = websiteId;
        models.pageModel.createPage(websiteId,obj)
            .then(function (pageObj) {
                models.websiteModel.findWebsiteById(websiteId)
                    .then(function (websiteObj) {
                        websiteObj = websiteObj[0];
                        websiteObj.pages.push(pageObj._id)
                        websiteObj.save();
                        pageObj._website = websiteObj._id;
                        pageObj.save();
                        res.sendStatus(200).send(pageObj);
                    },function (err) {
                        res.sendStatus(404).send(err);
                    });
            },function (err) {
                res.sendStatus(404).send(err);
        });
    }

    function findPageById(req,res) {
        var pageId = req.params.pageId;
        models.pageModel.findPageById(pageId)
            .then(function(succ){
                if(succ.length>0)
                    res.send(succ[0]);
                else
                    res.send("0");
            },function(err){
                res.sendStatus(404).send(err);
        });
    }
    function updatePage(req,res) {
        var page = req.body;
        models.pageModel.updatePage(page._id,page)
            .then(function(succ){
                res.sendStatus(200).send("ok");
            },function(err){
                res.sendStatus(404).send(err);
            });
    }
    function deletePage(req,res) {
        var pageId = req.params.pageId;
        models.pageModel.findPageById(pageId)
            .then(function (pageObj) {
                pageObj = pageObj[0];
                websiteId = pageObj._website;
                models.pageModel.deletePage(pageId)
                    .then(function(succ){
                        models.websiteModel.findWebsiteById(websiteId)
                            .then(function (websiteObj) {
                                websiteObj = websiteObj[0];
                                for(var i=0;i<websiteObj.pages.length;i++) {
                                    if (websiteObj.pages[i] == pageId) {
                                        websiteObj.pages.splice(i, 1);
                                        break;
                                    }
                                }
                                websiteObj.save();
                                res.send("ok");
                            },function (err) {
                                res.sendStatus(404).send(err);
                            });
                    },function(err){
                        res.sendStatus(404).send(err);
                    });
            });
    }
};