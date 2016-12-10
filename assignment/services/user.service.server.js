/**
 * Created by Vineeth on 10/31/16.
 */
var passport         = require('passport');
var LocalStrategy    =  require('passport-local').Strategy;

module.exports = function(app,models) {

    app.post("/api/user",createUser);
    app.get("/api/user",findUser);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);
    app.post('/api/login', passport.authenticate('local'), login);
    app.post  ('/api/logout', logout);
    app.post  ('/api/register',register);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        models.userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }
    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        models.userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }


    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        models.userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return models.userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user) {
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
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
            username: user.username,
            password: user.password,
            firstName: "",
            lastName: ""
        }
        models.userModel.createUser(obj)
            .then(function(user) {
                res.send(user);
            }, function(err) {
                res.sendStatus(400).send(error);
        });
    }
    function findUser(req,res){
        var params = req.query;
        if(params.username && params.password) {
            findUserByCredentials(params.username,params.password,res);
        }
        else if(params.username) {
            var result = findUserByUsername(params.username);
            if(!result)
                res.send("0");
            else
                res.send(result);
        }
    }
    function findUserByCredentials(username,password,res) {
        models.userModel.findUserByCredentials(username,password)
            .then(function (succ) {
                if(succ.length>0)
                    res.send(succ[0]);
                else
                    res.send("0");
            },function (err) {
                res.sendStatus(404).send(err);
        });
    }

    function findUserByUsername(username){
        return models.userModel.findUserByUsername(username);
    }
    function findUserById(req,res) {
        var userId = req.params.userId;
        models.userModel.findUserById(userId)
            .then(function(user){
                res.send(user[0]);
            },function(err){
                res.sendStatus(404).send(err);
        });
    }
    function updateUser(req,res) {
        var user = req.body;
        models.userModel.updateUser(user._id,user)
            .then(function(succ){
                res.send(user);
            },function(err){
                res.sendStatus(404).send(err);
            });
    }
    function deleteUser(req,res) {
        models.userModel.deleteUser(uid)
            .then(function(succ){
                res.sendStatus(200).send(succ);
            },function(err){
                res.sendStatus(404).send(err);
        });
    };
}