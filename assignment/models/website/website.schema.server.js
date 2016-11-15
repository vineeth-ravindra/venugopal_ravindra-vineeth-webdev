/**
 * Created by Vineeth on 11/15/16.
 */
module.exports = function(){
    var mongoose = require('mongoose');
    var websiteSchema = mongoose.Schema( {
        name: String,
        developerId: String
    },{collection:"websiteModel"});
    return websiteSchema;
};