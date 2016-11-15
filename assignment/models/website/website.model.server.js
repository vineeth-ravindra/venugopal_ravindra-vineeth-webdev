/**
 * Created by Vineeth on 11/15/16.
 */
module.exports  = function() {
    var mongoose = require('mongoose');
    var ObjectId = require('mongodb').ObjectId;
    var websiteSchema = require("./website.schema.server")();
    var websiteModel = mongoose.model("WebsiteModel",websiteSchema);
    var api = {
        "createWebsite": createWebsite,
        "findWebsiteById":findWebsiteById,
        "findAllWebsitesForUser":findAllWebsitesForUser,
        "updateWebsite":updateWebsite,
        "deleteWebsite":deleteWebsite
    };
    return api;

    function createWebsite(website){
        return websiteModel.create(website);
    }
    function findWebsiteById(websiteId) {
        websiteId = new ObjectId(websiteId);
        return websiteModel.find({_id:websiteId});
    }
    function findAllWebsitesForUser(userId){
        return websiteModel.find({developerId:userId});
    }
    function updateWebsite(websiteId,newWebsite) {
        return websiteModel.update({_id:websiteId},newWebsite);
    }
    function deleteWebsite(websiteId){
        return websiteModel.remove({_id:websiteId});
    }
};