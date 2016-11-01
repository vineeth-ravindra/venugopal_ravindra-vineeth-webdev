/**
 * Created by Vineeth on 11/1/16.
 */
module.exports = function(app){
    var website = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:userId/website",createWebsite);
    app.get("/api/user/:userId/website",findAllWebsitesForUser);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);

    function createWebsite(req,res) {
        var userId = req.params.userId;
        var site = req.body;
        site.developedId = userId;
        var newSite = {};
        newSite._id = Math.floor(Math.random() * 999) + 1;
        newSite.name = site.name;
        newSite.developerId = userId;
        website.push(newSite);
        res.send(newSite);
    }

    function findAllWebsitesForUser(req,res) {
        var userId = req.params.userId;
        var returnList = []
        for(var i=0;i<website.length;i++){
            if(website[i].developerId == userId)
                returnList.push(website[i])
        }
        res.send(returnList);
    }
    function findWebsiteById(req,res) {
        var websiteId = req.params.websiteId;
        for(var i=0;i<website.length;i++){
            if(website[i]._id == websiteId) {
                res.send(website[i]);
                return;
            }
        }
        return false;
    }

    function updateWebsite(req,res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        for(var i=0;i<website.length;i++) {
            if(website[i]._id == websiteId) {
                website[i].name = newWebsite.name;
                break;
            }
        }
        res.send(website);
    }
    function deleteWebsite(req,res) {
        var websiteId = req.params.websiteId;
        for(var i=0;i<website.length;i++){
            if(website[i]._id == websiteId)
                website.splice(i,1);
        }
        res.send("ok");
    }
}
