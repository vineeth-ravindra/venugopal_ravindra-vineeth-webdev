/**
 * Created by Vineeth on 10/31/16.
 */
module.exports = function(app) {
    var models = require("./model/models.server.js")();
    require("./services/user.service.server.js")(app,models);
    require("./services/website.service.server.js")(app,models);
    require("./services/page.service.server.js")(app,models);
    require("./services/widget.service.server.js")(app,models);
}