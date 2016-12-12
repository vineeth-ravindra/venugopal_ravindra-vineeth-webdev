/**
 * Created by Vineeth on 10/10/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController",RegisterController)
        .controller("ProfileController",ProfileController);
        function LoginController($location,$mdDialog, UserService, RouteService,ToastService) {
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
                    if(!vm.user.username || vm.user.username.length===0){
                        showAllert("Please username");
                        vm.user.username = "";
                        return
                    }
                    else if(!vm.user.password || vm.user.password.length===0){
                        showAllert("Please enter password");
                        vm.user.password = "";
                        return
                    }
                    else {
                        vm.user.username = vm.user.username.trim();
                        UserService
                            .login(vm.user)
                            .then(function(response) {
                                    var user = response.data;
                                    vm.user = user;
                                    $location.url(RouteService.getProfilePage(user._id));
                                },function (err) {
                                    showAllert("Invalid username/password")
                                    return;
                            });
                    }
                }
            }
            function showAllert(message) {
                ToastService.showToast(message);
            };
        }

        function RegisterController($location,$mdDialog,UserService,RouteService,ToastService) {
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
                        var promise = UserService.register(vm.user);
                        promise
                            .success(function(res){
                                $location.url(RouteService.getProfilePage(res._id));
                            })
                            .error(function(res){
                                console.log("Error");
                            })

                    }
                }
            }
            function showAllert(message) {
                ToastService.showToast(message);
            };
        }
        function ProfileController($location,$mdDialog,$routeParams,UserService,RouteService){
            var vm = this;
            vm.pageButtonClicks = pageButtonClicks;
            function init(){
                var promise = UserService.findCurrentUser();
                promise
                    .success(function (res) {
                        vm.user = res;
                    })
                    .error(function (res) {

                    });
            }
            init();
            function pageButtonClicks(type) {
                if(type==='ok'){
                    var promise = UserService.updateUser($routeParams.uid,vm.user);
                    promise
                        .success(function(res){
                            $location.url(RouteService.getProfilePage($routeParams.uid));
                        })
                        .error(function (res) {
                            
                        });
                }
                else if(type==='profile'){
                    $location.url(RouteService.getProfilePage(vm.user._id));
                }
                else if(type==='websites'){
                    $location.url(RouteService.getWebsiteList(vm.user._id));
                }
                else if(type==='logout'){
                    UserService.logout(vm.user);
                    $location.url(RouteService.getLogin());
                }
            }
            function goToWebsite(){
                $location.url("/user/" +$routeParams.uid+"/website");
            }
            function logout() {
                $location.url("/login");
            }
        }
})();

