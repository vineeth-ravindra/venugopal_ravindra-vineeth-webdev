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

    function findAllPagesForWebsite(req,res) {
        var websiteId = req.params.websiteId;
        var returnList = [];
        for(var i=0;i<pages.length;i++){
            if(pages[i].websiteId == websiteId)
                returnList.push(pages[i])
        }
        res.send(returnList);
    }
    function createPage(req,res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        var obj = {};
        obj.name = page.name;
        obj.websiteId = websiteId;
        obj._id = Math.floor(Math.random()*999) + 1;
        page.websiteId = websiteId;
        pages.push(obj);
        res.send("ok");
    }
    function findPageById(req,res){
        var pageId = req.params.pageId;
        for(var i=0;i<pages.length;i++){
            if(pages[i]._id == pageId) {
                res.send(pages[i]);
                return;
            }
        }
        res.send("0");
    }
    function deletePage(req,res) {
        var pageId = req.params.pageId;
        for(var i=0;i<pages.length;i++){
            if(pages[i]._id == pageId)
                pages.splice(i,1);
        }
        res.send("ok");
    }
    function updatePage(req,res) {
        var page = req.body;
        for(var i=0;i<pages.length;i++){
            if(pages[i]._id == page._id){
                pages[i] = page;
                res.send("ok");
                return;
            }
        }
        res.send("0");
    }
}