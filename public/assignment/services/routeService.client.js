/**
 * Created by Vineeth on 10/19/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("RouteService",RouteService);
    function RouteService(){
        var api = {
            getLogin  : getLogin,
            getRegister  : getRegister,
            getProfilePage  : getProfilePage,
            getWebsiteList : getWebsiteList,
            getWebsiteNew : getWebsiteNew,
            getWebsiteEdit : getWebsiteEdit,
            getPageList : getPageList,
            getPageNew : getPageNew,
            getPageEdit :getPageEdit,
            getWidgetlist : getWidgetlist,
            getwidgetChooser :getwidgetChooser,
            getWidgetedit : getWidgetedit,
            getFlicker :getFlicker
        };
        return api;
        function getLogin() {
            return "/login";
        }
        function getRegister() {
            return "/register";
        }
        function getProfilePage(uid){
            return "/user/"+uid;
        }
        function getWebsiteList(uid){
            return "/user/"+uid+"/website";
        }
        function getWebsiteNew(uid){
            return "/user/"+uid+"/website/new";
        }
        function getWebsiteEdit(uid,wid){
            return "/user/"+uid+"/website/"+wid;
        }
        function getPageList(uid,wid){
            return "/user/"+uid+"/website/"+wid+"/page";
        }
        function getPageNew(uid,wid){
            return "/user/"+uid+"/website/"+wid+"/page/new";
        }
        function getPageEdit(uid,wid,pid){
            return "/user/"+uid+"/website/"+wid+"/page/"+pid;
        }
        function getWidgetlist(uid,wid,pid){
            return "/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget";
        }
        function getwidgetChooser(uid,wid,pid){
            return "/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/new";
        }
        function getWidgetedit(uid,wid,pid,wgid){
            return "/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/"+wgid;
        }
        function getFlicker(uid,wid,pid,wgid){
            return "/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/"+wgid+"/flicker";
        }
    }
})();