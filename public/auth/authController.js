
(function() {
    angular.module('appQrPonto').controller('AuthCtrl', [
        '$location',
        'msgs',
        'auth',
        AuthController
    ])

    function AuthController($location, msgs, auth) {
        const vm = this

        vm.getUser = () => auth.getUser()

        
        vm.login = () => {
            auth.login(vm.colaborador, err => err ? msgs.addError(err) : window.location.href = 'index.html')
        }

        vm.logout = () => {
            auth.logout(() => $location.path('/'))
        }
    }
})()