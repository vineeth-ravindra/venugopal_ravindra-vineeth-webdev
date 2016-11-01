/**
 * Created by Vineeth on 10/31/16.
 */

module.exports = function(app){
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];
    app.post("/api/user",createUser);
    app.get("/api/user",findUser);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);


    function trimUser(user){
        user.username = user.username.trim();
        user.paswrod = user.password.trim();
        user.password_verify = user.password_verify.trim();
        return user;
    }

    function createUser(req,res) {
        var user = req.body;
        user = trimUser(user);
        var id = Math.floor(Math.random() * 999);
        id = id.toString();
        var obj = {
            _id: id,
            username: user.username,
            password: user.password,
            firstName: "",
            lastName: ""
        }
        users.push(obj);
        res.send(obj);
    }
    function findUser(req,res){
        var params = req.query;
        if(params.username && params.password) {
            var result = findUserByCredentials(params.username,params.password);
            if(!result)
                res.send("0");
            else
                res.send(result);
        }
        else if(params.username) {
            var result = findUserByUsername(params.username);
            if(!result)
                res.send("0");
            else
                res.send(result);
        }
    }
    function findUserByCredentials(username,password) {
        var user = findUserByUsername(username);
        if(user) {
            if(user.password === password)
                return user;
        }
        return false;
    }
    function findUserByUsername(username){
        for(var i=0;i<users.length;i++){
            if(users[i].username == username)
                return users[i];
        }
        return false;
    }
    function findUserById(req,res) {
        var userId = req.params.userId;
        for(var i=0;i<users.length;i++){
            if(users[i]._id == userId) {
                res.send(users[i]);
                return;
            }
        }
        res.send("0");
    }
    function updateUser(req,res) {
        var user = req.body;
        for(var i=0;i<users.length;i++){
            if(users[i]._id == user._id) {
                users[i] = user;
                break;
            }
        }
        res.send(user);
    }
    function deleteUser(req,res) {
        var uid = req.params.userId;
        for(var u in users) {
            if(users[u]._id == uid) {
                users.splice(u, 1);
            }
        }
        res.send(200);
    }
}