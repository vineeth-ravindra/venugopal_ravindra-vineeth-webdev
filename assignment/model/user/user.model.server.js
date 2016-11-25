/**
 * Created by Vineeth on 11/14/16.
 */

module.exports  = function() {
    var mongoose = require('mongoose');
    var ObjectId = require('mongodb').ObjectId;
    var userSchema = require("./user.schema.server")();
    var userModel = mongoose.model("UserModel",userSchema);
    var api = {
        "createUser"            : createUser,
        "findUserById"          : findUserById,
        "updateUser"            : updateUser,
        "deleteUser"            : deleteUser,
        "findUserByUsername"    : findUserByUsername,
        "findUserByCredentials" : findUserByCredentials

    };
    return api;

    function findUserByUsername(userName){
        return userModel.find({username:userName});
    }
    function deleteUser(userId){
        return userModel.remove({_id:userId});
    }
    function createUser(user){
        return userModel.create(user);
    }
    function findUserById(userId){
        userId = new ObjectId(userId);
        return userModel.find({_id:userId});
    }
    function updateUser(userId,user) {
        return userModel.update(
            {_id:userId},
            user
        );
    }
    function findUserByCredentials(username,password){
        return userModel.find({
            username:username,
            password:password
        });
    }
};

