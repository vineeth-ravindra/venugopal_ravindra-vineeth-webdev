/**
 * Created by Vineeth on 11/1/16.
 */
module.exports = function(app,models) {
    app.post("/api/user/:userId/website",createWebsite);
    app.get("/api/user/:userId/website",findAllWebsitesForUser);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);
    (function(){models.websiteModel.setModels(models);})()

    function createWebsite(req,res) {
        var userId = req.params.userId;
        var site = req.body;
        site.developedId = userId;
        var newSite = {};
        newSite.name = site.name;
        newSite.developerId = userId;
        models.websiteModel.createWebsiteForUser(userId,newSite)
            .then(function (newWebSite) {
                models.userModel.findUserById(userId)
                    .then(function (userObj) {
                        userObj = userObj[0];
                        userObj.websites.push(newWebSite._id);
                        userObj.save();
                        newWebSite._user = userObj._id;
                        newWebSite.save();
                        res.sendStatus(200).send(dbSite);
                    },function (err) {
                        res.sendStatus(404).send("0")
                });
            },function (err) {
                res.sendStatus(404).send("0")
        });
    }
    function findAllWebsitesForUser(req,res) {
        var userId = req.params.userId;
        models.websiteModel.findAllWebsitesForUser(userId)
            .then(function(websites){
                res.send(websites);
            },function(err){
                res.sendStatus(404).send('0');
        });
    }

    function findWebsiteById(req,res) {
        var websiteId = req.params.websiteId;
        models.websiteModel.findWebsiteById(websiteId)
            .then(function(website){
                res.send(website[0]);
            },function(err){
                res.send(404).send(err);
        });
    }

    function updateWebsite(req,res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        models.websiteModel.updateWebsite(websiteId,newWebsite)
            .then(function(website){
                res.sendStatus(200).send(website);
            },function(err){
                res.sendStatus(404).send(err);
        });
    }
    function deleteWebsite(req,res) {
        var websiteId = req.params.websiteId;
        models.websiteModel.findWebsiteById(websiteId)
            .then(function (websiteObj) {
                websiteObj = websiteObj[0];
                userId = websiteObj._user;
                models.websiteModel.deleteWebsite(websiteId)
                    .then(function(succ){
                        models.userModel.findUserById(userId)
                            .then(function (userObj) {
                                userObj = userObj[0];
                                for(var i=0;i<userObj.websites.length;i++) {
                                    if (userObj.websites[i] == websiteId) {
                                        userObj.websites.splice(i, 1);
                                        break;
                                    }
                                }
                                userObj.save();
                                res.sendStatus(200).send("ok");
                            },function (err) {
                                res.sendStatus(404).send(err);
                            });
                    },function(err){
                        res.sendStatus(404).send(err);
                    });
            });
    }
};
