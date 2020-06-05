$(document).ready(function() {
    leerJSON();
});

var infolives;
var labelsFechas = [];
var denunciasConteo = [];
var denunciasLive = new Map();

function leerJSON() {
    $.getJSON('datos/infolives.json', function(data) {
        infolives = data;
        calcularIndicadoresActivismo();
        chartDenuncias();
    });
}

function calcularIndicadoresActivismo() {
    var fecha_semana_actual = "";
    var i = 0;
    var i_max = Object.keys(infolives).length;
    $.each(infolives, function() {
        labelsFechas.push(this.fecha);
        denunciasLive.set(this.fecha, this.denuncias);
        denunciasConteo.push(Object.keys(this.denuncias).length);
        if (i_max - 1 === i) {
            fecha_semana_actual = this.fecha;
        }
        i++;
    });
    cargarDenuncias(fecha_semana_actual);
}

function chartDenuncias() {
    if ($('#chart_acciones_concretas').length) {

        var echartBar = echarts.init(document.getElementById('chart_acciones_concretas'), themeEchart);

        echartBar.setOption({
            title: {
                text: 'Acciones Concretas',
                subtext: 'Cantidad'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                x: 220,
                y: 40,
                data: ['Denuncias']
            },
            toolbox: {
                show: false
            },
            calculable: false,
            xAxis: [{
                type: 'category',
                data: labelsFechas
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: 'Denuncias',
                type: 'bar',
                smooth: true,
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data: denunciasConteo
            }]
        });

    }

    echartBar.on('mouseover', function(params) {
        cargarDenuncias(params.name);
    });

}

function cargarDenuncias(key) {
    var denuncia = denunciasLive.get(key);
    $("#fecha_denuncias").html(key);
    $("#activismo_detalle").html("");
    $.each(denuncia, function() {
        var valor = '<li>';
        valor += '<div class="block">';
        valor += '<div class="block_content">';
        valor += '<h2 class="title">';
        valor += '<a>' + this + '</a>';
        valor += '</h2>';
        valor += '</div>';
        valor += '</div>';
        valor += '</li>';
        $("#activismo_detalle").append(valor);
    });
}