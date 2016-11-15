/**
 * Created by Vineeth on 11/14/16.
 */
module.exports = function(){
    var mongoose = require('mongoose');
    var userSchema = mongoose.Schema({
        username:String,
        password:String,
        firstName:String,
        lastName:String
    },{collection:"userModel"});
    return userSchema;
}