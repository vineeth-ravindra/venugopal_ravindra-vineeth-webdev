/**
 * Created by Vineeth on 10/10/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController",RegisterController)
        .controller("ProfileController",ProfileController);
        function LoginController($location, UserService,$mdDialog) {
            var vm = this;
            vm.login = login;
            function login(user) {
                if(!user) {
                    showAllert("Please enter username and password");
                    return
                }
                if(!user.username) {
                    showAllert("Please enter username");
                    return
                }
                if(!user.password){
                    showAllert("Please enter password");
                    return;
                }
                user = UserService.findUserByCredentials(user.username.trim(), user.password);
                if(user) {
                    $location.url("/user/" + user._id);
                } else {
                    vm.alert = "Unable to login";
                    showAllert("Username/Password not found");
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

        function RegisterController($location,UserService,$mdDialog) {
            var vm = this;
            vm.register = register;
            function  register(user) {
                console.log(user);
                if(!user) {
                    showAllert("Please enter required fields")
                }
                else if(!user.username || !user.password || !user.password_verify) {
                    showAllert("Please enter required fields");
                }
                else if(user.password != user.password_verify){
                    showAllert("Passwords do not match try again");
                }
                else {
                    var result = UserService.createUser(user);
                    if(!result)
                        showAllert("Username already exists! try another one")
                    else
                        $location.url("/user/" + user._id);
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
        function ProfileController($location,UserService,$mdDialog,$routeParams){
            var vm = this;
            vm.ok = ok;
            vm.person = person;
            vm.goToWebsite = goToWebsite;
            vm.logout = logout;

            function ok(){
                $location.url("/user/" +$routeParams.uid);
            }
            function person(){
                $location.url("/user/" +$routeParams.uid);
            }
            function goToWebsite(){
                $location.url("/user/" +$routeParams.uid+"/website");
            }
            function logout() {
                $location.url("/login");
            }
        }
})();