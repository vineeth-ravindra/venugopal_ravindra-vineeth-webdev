/**
 * Created by Vineeth on 10/19/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("RouteService",RouteService);
    function RouteService(){
        var api = {
            getLogin  : loginPage,
            getRegister  : registerPage,
            getProfilePage  : profilePage,
            getWebsiteList : websiteList,
            getWebsiteNew : websiteNew,
            getWebsiteEdit : websiteEdit,
            getPageList : pageList,
            getPageNew : pageNew,
            getPageEdit :pageEdit,
            getWidgetlist : widgetlist,
            getwidgetChooser :widgetChooser,
            getWidgetedit : widgetEdit
        };
        return api;
        function loginPage() {
            return "/login";
        }
        function registerPage() {
            return "/register";
        }
        function profilePage(uid){
            return "/user/"+uid;
        }
        function websiteList(uid){
            return "/user/"+uid+"/website";
        }
        function websiteNew(uid){
            return "/user/"+uid+"/website/new";
        }
        function websiteEdit(uid,wid){
            return "/user/"+uid+"/website/"+wid;
        }
        function pageList(uid,wid){
            return "/user/"+uid+"/website/"+wid+"/page";
        }
        function pageNew(uid,wid){
            return "/user/"+uid+"/website/"+wid+"/page/new";
        }
        function pageEdit(uid,wid,pid){
            return "/user/"+uid+"/website/"+wid+"/page/"+pid;
        }
        function widgetlist(uid,wid,pid){
            return "/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget";
        }
        function widgetChooser(uid,wid,pid){
            return "/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/new";
        }
        function widgetEdit(uid,wid,pid,wgid){
            return "/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/"+wgid;
        }
    }
})();