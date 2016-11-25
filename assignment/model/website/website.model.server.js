/**
 * Created by Vineeth on 11/15/16.
 */
module.exports  = function() {
    var mongoose = require('mongoose');
    var ObjectId = require('mongodb').ObjectId;
    var websiteSchema = require("./website.schema.server")();
    var websiteModel = mongoose.model("WebsiteModel",websiteSchema);
    var models = null
    var api = {
        "setModels"                     : setModels,
        "createWebsiteForUser"          : createWebsiteForUser,
        "findAllWebsitesForUser"        : findAllWebsitesForUser,
        "findWebsiteById"               : findWebsiteById,
        "updateWebsite"                 : updateWebsite,
        "deleteWebsite"                 : deleteWebsite
    };
    return api;

    function setModels(m) {
        models = m;
    }
    function createWebsiteForUser(userId,website){
        return websiteModel.create(website);
    }
    function findWebsiteById(websiteId) {
        websiteId = new ObjectId(websiteId);
        return websiteModel.find({_id:websiteId});
    }
    function findAllWebsitesForUser(userId){
        return websiteModel.find({_user:userId});
    }
    function updateWebsite(websiteId,newWebsite) {
        return websiteModel.update({_id:websiteId},newWebsite);
    }
    function deleteWebsite(websiteId){
        return websiteModel.remove({_id:websiteId});
    }
};



