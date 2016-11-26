/**
 * Created by Vineeth on 11/15/16.
 */
module.exports  = function() {
    var mongoose = require('mongoose');
    var ObjectId = require('mongodb').ObjectId;
    var widgetSchema = require("./widget.schema.server")();
    var widgetModel = mongoose.model("WidgetModel", widgetSchema);
    var models = null;
    var api = {
        "setModel"                   : setModel,
        "createWidget"              : createWidget,
        "findAllWidgetsForPage"     : findAllWidgetsForPage,
        "findWidgetById"            : findWidgetById,
        "updateWidget"              : updateWidget,
        "deleteWidget"              : deleteWidget,
        "reorderWidget"             : reorderWidget
    };
    return api;
    function setModel(m) {
        models = m;
    }
    function createWidget(pageId,widget){
        return widgetModel.create(widget);
    }
    function findAllWidgetsForPage(pageId){
        return widgetModel.find({_page:pageId});
    }
    function findWidgetById(widId){
        widId = new ObjectId(widId);
        return widgetModel.find({_id:widId});
    }
    function updateWidget(wid,widget){
        return widgetModel.update({_id:wid},widget)
    }
    function deleteWidget(wid){
        return widgetModel.remove({_id:wid});
    }
    function reorderWidget(pageId, start, end) {
        return models.pageModel.findPageById(pageId);

    }
};

