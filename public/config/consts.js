(function() {
    app.constant('consts', {
        appName: 'App Qr Ponto',
        version: '1.0',
        owner: 'Oursys',
        year: '2019',
         //apiUrl: 'https://api-qrponto.oursys.com.br',
         //oapiUrl: 'https://api-qrponto.oursys.com.br/oapi',
        apiUrl: 'http://localhost:4040',
        oapiUrl: 'http://localhost:4040/oapi',
        buscaCNPJ: 'https://www.receitaws.com.br/v1/cnpj',
        userKey: 'app_qr_ponto_user'
    }).run(['$rootScope', 'consts', function($rootScope, consts) {
        $rootScope.consts = consts
    }])
})()