(function() {
    angular.module('appQrPonto').factory('auth', [
        '$http',
        'consts',
        AuthFactory
    ])

    function AuthFactory($http, consts) {
        
        let colaborador = null
        //Função para Buscar o usuário
        function getUser() {
            if(!colaborador) {
                colaborador = JSON.parse(localStorage.getItem(consts.userKey))
                $http.defaults.headers.common.Authorization = colaborador ? colaborador.token : null
            }
            return colaborador
        }

        function submit(url, colaborador, callback) {
            console.log(colaborador)
            $http.post(`${consts.oapiUrl}/${url}`, colaborador)
                .then(resp => {
                    localStorage.setItem(consts.userKey, JSON.stringify(resp.data))
                    $http.defaults.headers.common.Authorization = resp.data.token
                    if (callback) callback(null, resp.data)
                }).catch((resp) => {
                    if (callback) callback(resp.data.errors, null)
                })
        }

        function login(colaborador, callback) {
            submit('loginColaborador', colaborador, callback)
        }

        function validateToken(token, callback) {
            if (token) {
                $http.post(`${consts.oapiUrl}/validateToken`, { token })
                    .then(resp => {
                        if (!resp.data.valid) {
                            logout()
                        } else {
                            $http.defaults.headers.common.Authorization = getUser().token
                        }
                        if (callback) callback(null, resp.data.valid)
                    }).catch(function (resp) {
                        if (callback) callback(resp.data.errors)
                    })
            } else {
                if (callback) callback('Token inválido.')
            }
        }

        function logout(callback) {
            colaborador = null
            localStorage.removeItem(consts.userKey)
            $http.defaults.headers.common.Authorization = ''
            if (callback) callback(null)
        }

        return {login, getUser, validateToken, logout}
    }
})()