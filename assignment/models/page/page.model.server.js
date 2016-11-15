/**
 * Created by Vineeth on 11/15/16.
 */
module.exports  = function() {
    var mongoose = require('mongoose');
    var ObjectId = require('mongodb').ObjectId;
    var pageSchema = require("./page.schema.server")();
    var pageModel = mongoose.model("PageModel", pageSchema);
    var api = {
        "createPage": createPage,
        "deletePage":deletePage,
        "findPageById":findPageById,
        "findAllPagesForWebsite":findAllPagesForWebsite,
        "updatePage":updatePage
    };
    return api;
    function createPage(page) {
        return pageModel.create(page);
    }
    function deletePage(pageId) {
        return pageModel.remove({_id:pageId});
    }
    function findPageById(pageId){
        pageId = new ObjectId(pageId);
        return pageModel.find({_id:pageId});
    }
    function findAllPagesForWebsite(wid) {
        return pageModel.find({websiteId:wid});
    }
    function updatePage(pageId,newPage){
        return pageModel.update({_id:pageId},newPage);
    }
}