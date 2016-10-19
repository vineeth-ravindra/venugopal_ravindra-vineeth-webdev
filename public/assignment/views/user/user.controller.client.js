/**
 * Created by Vineeth on 10/10/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController",RegisterController)
        .controller("ProfileController",ProfileController);
        function LoginController($location,$mdDialog, UserService, RouteService) {
            var vm = this;
            vm.clickEvent = pageButtonClicks;
            vm.user = {
                username:"",
                password:""
            };
            function pageButtonClicks(type){
                if(type==='register'){
                    $location.url(RouteService.getRegister());
                }
                else if(type==='login'){
                    if(vm.user.username.length===0){
                        showAllert("Please username");
                        return
                    }
                    else if(vm.user.password.length===0){
                        showAllert("Please enter username and password");
                        return
                    }
                    else {
                        user = UserService.findUserByCredentials(vm.user.username.trim(), vm.user.password);
                        if(user) {
                            $location.url(RouteService.getProfilePage(user._id));
                        } else {
                            vm.alert = "Unable to login";
                            showAllert("Username/Password not found");
                        }
                    }
                }
            }
            function showAllert(message) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .textContent(message)
                        .ariaLabel(message)
                        .ok('Got it!')

                );
            };
        }

        function RegisterController($location,$mdDialog,UserService,RouteService) {
            var vm = this;
            vm.pageButtonClicks = pageButtonClicks;
            vm.user = {
                username:"",
                password:"",
                password_verify:""
            }
            function pageButtonClicks(type){
                if(type==='cancel') {
                    $location.url(RouteService.getLogin);
                }
                if(type==='register'){
                    if(vm.user.username.length === 0 || vm.user.password.length === 0 || 
                        vm.user.password_verify.length === 0) {
                        showAllert("Please enter required fields");
                    }
                    else if(vm.user.password != vm.user.password_verify){
                        showAllert("Passwords do not match try again");
                    }
                    else {
                        var result = UserService.createUser(vm.user);
                        if(!result)
                            showAllert("Username already exists! try another one")
                        else
                            $location.url(RouteService.getProfilePage(result._id));
                    }
                }
            }
            function showAllert(message) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .textContent(message)
                        .ariaLabel(message)
                        .ok('Got it!')

                );
            };
        }
        function ProfileController($location,$mdDialog,$routeParams,UserService,RouteService){
            var vm = this;
            vm.pageButtonClicks = pageButtonClicks;
            function init(){
                vm.user = UserService.findUserById($routeParams.uid);
            }
            function pageButtonClicks(type) {
                if(type==='ok'){
                    UserService.updateUser($routeParams.uid,vm.user);
                    $location.url(RouteService.getProfilePage($routeParams.uid));    
                }
                else if(type==='profile'){
                    $location.url(RouteService.getProfilePage($routeParams.uid));
                }
                else if(type==='websites'){
                    $location.url(RouteService.getWebsiteList($routeParams.uid));
                }
                else if(type==='logout'){
                    $location.url(RouteService.getLogin());
                }
            }
            function goToWebsite(){
                $location.url("/user/" +$routeParams.uid+"/website");
            }
            function logout() {
                $location.url("/login");
            }
            init();
        }
})();