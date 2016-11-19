/**
 * Created by Vineeth on 11/15/16.
 */
module.exports = function(){
    var mongoose = require('mongoose');
    var widgetSchema = mongoose.Schema( {
        widgetType: String,
        pageId: String,
        size : String,
        text : String,
        width: Number,
        url : String,
        pos : String
    },{collection:"widgetModel"});
    return widgetSchema;
};