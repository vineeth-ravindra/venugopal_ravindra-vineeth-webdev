/**
 * Created by Vineeth on 10/31/16.
 */
var passport         = require('passport');
var LocalStrategy    =  require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app,models) {

    app.post("/api/user",createUser);
    app.get("/api/user",findUser);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);
    app.post('/api/login', passport.authenticate('local'), login);
    app.post  ('/api/logout', logout);
    app.post  ('/api/register',register);
    app.get   ('/api/loggedin', loggedin);

    var facebookConfig = {
        clientID        : process.env.FACEBOOK_CLIENT_ID,
        clientSecret    : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL     : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));


    function localStrategy(username, password, done) {
        models.userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    user = user[0]
                    if(user && bcrypt.compareSync(password, user.password))
                        return done(null, user);
                    else
                        return done(null, false);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        models.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName:  names[1],
                            firstName: names[0],
                            email:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        models.userModel.createUser(newFacebookUser)
                            .then(
                                function(user){
                                    return done(null, user);
                                },
                                function(err){
                                    if (err) { return done(err); }
                            });
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
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
        res.sendStatus(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }
    function register(req, res) {
        var user = req.body;
        user = trimUser(user);
        var obj = {
            username: user.username,
            password: user.password,
            firstName: "",
            lastName: ""
        };
        models.userModel.findUserByUsername(user.username)
            .then(function (user) {
                if(user.length>0)
                    res.sendStatus(400).send(error);
                else {
                    obj.password = bcrypt.hashSync(obj.password);
                    models.userModel.createUser(obj)
                        .then(function(user) {
                            res.send(user);
                        }, function(err) {
                            res.sendStatus(400).send(error);
                    });
                }

            });
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
        else
            res.send(req.user);
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
                res.send(user);
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