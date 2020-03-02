(function () {
    app.controller('PontoCtrl', [
        '$http',
        'consts',
        '$timeout',
        'auth',
        'msgs',
        'SweetAlert',
        PontoController
    ])

    function PontoController($http, consts, $timeout, auth, msgs, SweetAlert) {


        Date.prototype.today = function () {
            return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
        }

        Date.prototype.timeNow = function () {
            return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
        }

        const vm = this


        vm.colaborador = JSON.parse(localStorage.getItem(consts.userKey))
        const urlColaboradores = `${consts.apiUrl}/colaboradores/${vm.colaborador._id}/horas_trabalhadas`

        vm.getUser = () => auth.getUser()
        vm.horaAtual = "Carregando Hora Atual...";
        vm.tickInterval = 1000

        var tick = function () {
            vm.horaAtual = Date.now()
            $timeout(tick, vm.tickInterval);
        }

        $timeout(tick, vm.tickInterval);


        var date = new Date();
        vm.dataAtual = date

        const zeroFill = n => {
            return ('0' + n).slice(-2);
        }

        function horas() {
            let now = new Date();
            let horario = zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes());
            return horario;
        }

        function data() {
            let now = new Date();
            let data = zeroFill(now.getUTCDate()) + '/' + zeroFill((now.getMonth() + 1)) + '/' + now.getFullYear()
            return data
        }



        vm.registroPonto = []
        vm.registroHoje = []

        vm.getHorasTrabalhadas = () => {
            $http.get(urlColaboradores).then((resp) => {
                vm.registroPonto = resp.data
                vm.getRegistro = vm.registroPonto.filter((item) => ([data()].indexOf(item.date) !== -1))
                vm.registroHoje = vm.getRegistro[0] ? vm.getRegistro[0] : []
                if(vm.registroHoje.length == 0) {
                    vm.registroHoje.pontos = []
                }
            }).catch((resp => {
                msgs.addError(resp.data)
            }))
        }

        vm.addPonto = () => {
            if (vm.registroHoje.pontos.length >= 1 
                && vm.registroHoje.pontos.length < 4) {
                vm.registroHoje.pontos.push(horas())
                $http.put(urlColaboradores, vm.registroHoje)
                    .then((resp) => {
                        SweetAlert.swal("Uhuul", "Ponto Registrado com Sucesso!", "success");
                        vm.getHorasTrabalhadas()
                    }).catch((resp) => {
                        msgs.addError(resp.data)
                    })
            } else if (vm.registroHoje.pontos.length >= 4) {
                SweetAlert.swal("Você já realizou os registros de ponto por hoje :)");
            } else {
                let now = new Date();
                let json = { date: data(), pontos: [horas()], mes: zeroFill((now.getMonth() + 1)), ano: now.getFullYear() }
                $http.post(urlColaboradores, json).then((resp) => {
                    SweetAlert.swal("Uhuul","Ponto Registrado com Sucesso!", "success");
                    vm.getHorasTrabalhadas()
                }).catch((resp) => {
                    msgs.addError(resp.data)
                })
            }
        }

        vm.getHorasTrabalhadas()

    }
})()