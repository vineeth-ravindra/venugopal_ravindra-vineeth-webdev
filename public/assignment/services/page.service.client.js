/**
 * Created by Vineeth on 10/10/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);
    function PageService(){
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];
        var api = {
            "createPage" : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById":findPageById,
            "updatePage":updatePage,
            "deletePage":deletePage
        };
        return api;
        function createPage(websiteId,page){
            page.websiteId = websiteId;
            pages.push(page);
        }
        function findPageByWebsiteId(websiteId){
            var returnList = []
            for(var i=0;i<pages.length;i++){
                if(pages[i].websiteId == websiteId)
                    returnList.push(pages[i])
            }
            return returnList;
        }
        function findPageById(pageId){
            for(var i=0;i<page.length;i++){
                if(page[i]._id == pageId)
                    return pages[i];
            }
            return false;
        }
        function updatePage(pageId,page) {
            var w = findPageByWebsiteId(pageId);
            if(w) {
                w = page;
            }
            return false;
        }
        function deletePage(pageId) {
            for(var i=0;i<pages.length;i++){
                if(pages[i]._id == pageId)
                    pages.splice(i,1);
            }
        }
    }
})();