/**
 * Created by Vineeth on 11/15/16.
 */
module.exports = function(){
    var mongoose = require('mongoose');
    var widgetSchema = mongoose.Schema( {
        type            : {type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
        name            : String,
        text            : String,
        width           : String,
        height          : String,
        url             : String,
        placeholder     : String,
        description     : String,
        class           : String,
        icon            : String,
        rows            : Number,
        size            : Number,
        deletable       : Boolean,
        formatted       : Boolean,
        dateCreated     : {type: Date, default: Date.now},
        _page           : {type: mongoose.Schema.Types.ObjectId, ref:"PageModel"}

    },{collection:"widgetModel"});
    return widgetSchema;
};