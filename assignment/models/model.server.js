/**
 * Created by Vineeth on 11/14/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/wam-fall2016');
    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server")();
    var model = {
        "userModel" : userModel,
        "websiteModel": websiteModel
    };
    return model;
};