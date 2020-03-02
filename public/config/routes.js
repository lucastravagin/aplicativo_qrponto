(function() {
    app.config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider.state('bater-ponto', {
                url: '/bater-ponto',
                templateUrl: 'ponto/ponto.html'
            }).state('perfil-usuario', {
                url: '/perfil-usuario',
                templateUrl: 'perfil/perfil-usuario.html'
            })

            //$urlRouterProvider.otherwise('/bater-ponto')
        }
    ]).run([
        '$rootScope',
        '$http',
        '$location',
        '$window',
        'auth',
        function ($rootScope, $http, $location, $window, auth) {
            validateUser()
            $rootScope.$on('$locationChangeStart', () => validateUser())

            function validateUser() {
                const user = auth.getUser()
                const authPage = 'auth.html'
                const isAuthPage = $window.location.href.includes(authPage)
                console.log(isAuthPage)
                if (!user && !isAuthPage) {
                    window.location.href = authPage
                } else if (user && !user.isValid) {
                    auth.validateToken(user.token, (err, valid) => {
                        if (!valid) {
                            $window.location.href = authPage
                        } else {
                            user.isValid = true
                            $http.defaults.headers.common.Authorization = user.token
                            isAuthPage ? $window.location.href = '/' : $location.path('/bater-ponto')
                        }
                    })
                }
            }
        }
    ])
})()