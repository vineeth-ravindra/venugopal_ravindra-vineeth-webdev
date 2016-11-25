/**
 * Created by Vineeth on 11/15/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var websiteSchema = mongoose.Schema( {
        _website    : {type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"},
        name        : String,
        title       : String,
        description : String,
        widgets     : [{type: mongoose.Schema.Types.ObjectId, ref:"WidgetModel"}],
        dateCreated : {type: Date, default: Date.now},
    },{collection:"pageModel"});
    return websiteSchema;
};