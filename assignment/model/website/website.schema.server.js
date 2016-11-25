/**
 * Created by Vineeth on 11/15/16.
 */
module.exports = function(){
    var mongoose = require('mongoose');
    var websiteSchema = mongoose.Schema( {
        name        : String,
        _user       : {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
        description : String,
        pages       : [{type: mongoose.Schema.Types.ObjectId, ref: "PageModel"}],
        dateCreated : {type: Date, default: Date.now},
    },{collection:"websiteModel"});
    return websiteSchema;
};


