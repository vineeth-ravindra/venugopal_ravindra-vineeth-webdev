/**
 * Created by Vineeth on 11/15/16.
 */
module.exports  = function() {
    var mongoose = require('mongoose');
    var ObjectId = require('mongodb').ObjectId;
    var widgetSchema = require("./widget.schema.server")();
    var widgetModel = mongoose.model("WidgetModel", widgetSchema);
    var api = {
        "createWidget": createWidget,
        "findAllWidgetsForPage":findAllWidgetsForPage,
        "findWidgetById":findWidgetById,
        "updateWidget":updateWidget,
        "deleteWidget":deleteWidget,
        "findWidgetByPos":findWidgetByPos
    };
    return api;
    function createWidget(widget){
        return widgetModel.create(widget);
    }
    function findAllWidgetsForPage(pageId){
        return widgetModel.find({pageId:pageId});
    }
    function findWidgetById(widId){
        widId = new ObjectId(widId)
        return widgetModel.find({_id:widId});
    }
    function updateWidget(wid,widget){
        return widgetModel.update({_id:wid},widget)
    }
    function deleteWidget(wid){
        return widgetModel.remove({_id:wid});
    }
    function  findWidgetByPos(pos) {
        return widgetModel.find({"pos":pos});
    }
};