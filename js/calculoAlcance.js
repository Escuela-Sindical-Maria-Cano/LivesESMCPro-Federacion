$(document).ready(function() {
    leerJSON();
});

var infolives;
var labelsFechas = [];
var picoValues = [];
var minutosReproducidosValues = [];
var promedioReproduccionValues = [];
var numeroEspectadoresLive = [];
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var sumaEspectadoresMes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var presentacionesMes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function leerJSON() {
    $.getJSON('datos/infolives.json', function(data) {
        infolives = data;
        calcularIndicadoresCalidadAlcance();
        chartAlcanceEspectadores();
    });
}

function calcularIndicadoresCalidadAlcance() {
    var cantidad_total_espectadores = 0;
    var cantidad_espectadores_semana_pasada = 0;
    var cantidad_espectadores_semana_actual = 0;
    var promedio_tiempo_aire = 0;
    var tiempo_aire_semana_pasada = 0;
    var tiempo_aire_semana_actual = 0;
    var porcentaje_mujeres_semana_pasada = 0;
    var porcentaje_mujeres_semana_actual = 0;
    var porcentaje_hombres_semana_pasada = 0;
    var porcentaje_hombres_semana_actual = 0;
    var promedio_pico_espectadores = 0;
    var pico_espectadores_semana_pasada = 0;
    var pico_espectadores_semana_actual = 0;
    var cantidad_comentarios_semana_actual = 0;
    var cantidad_compartidos_semana_actual = 0;
    var cantidad_interacciones_semana_actual = 0;
    var fecha_semana_actual = "";
    var i = 0;
    var i_max = Object.keys(infolives).length;
    $.each(infolives, function() {
        cantidad_total_espectadores += this.cantidad_espectadores_live;
        promedio_tiempo_aire += this.total_minutos_aire;
        promedio_pico_espectadores += this.pico_espectadores_concurrentes;
        labelsFechas.push(this.fecha);
        picoValues.push(this.pico_espectadores_concurrentes);
        minutosReproducidosValues.push(this.total_minutos_vistos_transmision);
        promedioReproduccionValues.push(this.promedio_minutos_reproducion);
        numeroEspectadoresLive.push(this.cantidad_espectadores_live);
        var indiceFecha = obtenerIndiceFecha(this.fecha, "dd-mm-yyyy", "-");
        cantidad_total_espectadores += this.cantidad_espectadores_live;
        sumaEspectadoresMes[indiceFecha] += this.cantidad_espectadores_live;
        presentacionesMes[indiceFecha]++;
        if (i_max - 2 === i) {
            cantidad_espectadores_semana_pasada = this.cantidad_espectadores_live;
            tiempo_aire_semana_pasada = this.total_minutos_aire;
            porcentaje_mujeres_semana_pasada = this.porcentaje_mujeres;
            porcentaje_hombres_semana_pasada = this.porcentaje_hombres;
            pico_espectadores_semana_pasada = this.pico_espectadores_concurrentes;
        }
        if (i_max - 1 === i) {
            cantidad_espectadores_semana_actual = this.cantidad_espectadores_live;
            tiempo_aire_semana_actual = this.total_minutos_aire;
            porcentaje_mujeres_semana_actual = this.porcentaje_mujeres;
            porcentaje_hombres_semana_actual = this.porcentaje_hombres;
            pico_espectadores_semana_actual = this.pico_espectadores_concurrentes;
            cantidad_comentarios_semana_actual = this.total_comentarios;
            cantidad_compartidos_semana_actual = this.total_compartidos;
            cantidad_interacciones_semana_actual = this.total_interacciones;
            fecha_semana_actual = this.fecha;
        }
        i++;
    });
    promedio_tiempo_aire = Math.round(promedio_tiempo_aire / i_max);
    promedio_pico_espectadores = Math.round(promedio_pico_espectadores / i_max);
    $("#ultimo_numero_espectadores").html(cantidad_espectadores_semana_actual);
    $("#ultimo_numero_comentarios").html(cantidad_comentarios_semana_actual);
    $("#ultimo_numero_compartidos").html(cantidad_compartidos_semana_actual);
    $("#ultimo_numero_interacciones").html(cantidad_interacciones_semana_actual);
    $(".fecha_ultimo_live").html(fecha_semana_actual);

}



function chartAlcanceEspectadores() {
    if ($("#chart_alcance_todos").length) {
        console.log('Plot Alcance Todos');
        var ctx = document.getElementById("chart_alcance_todos");
        var lineChart = new Chart(ctx, {
            type: 'line',
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }]
                }
            },
            data: {
                labels: labelsFechas,
                datasets: [{
                    label: "Número de Espectadores",
                    backgroundColor: "rgba(253,141,60, 0.31)",
                    borderColor: "rgba(253,141,60, 0.7)",
                    pointBorderColor: "rgba(253,141,60, 0.7)",
                    pointBackgroundColor: "rgba(253,141,60, 0.7)",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointBorderWidth: 1,
                    data: numeroEspectadoresLive
                }]
            },
        });
    }
    if ($("#chart_alcance_x_mes").length) {
        console.log('Plot Alcance X Mes');
        var labelsMeses = [];
        var promediosMes = [];
        var i = 0;
        $.each(sumaEspectadoresMes, function() {
            if (this > 0) {
                labelsMeses.push(meses[i]);
                promediosMes.push(Math.round(sumaEspectadoresMes[i] / presentacionesMes[i]));
            }
            i++;
        });

        var ctx = document.getElementById("chart_alcance_x_mes");
        var lineChart = new Chart(ctx, {
            type: 'horizontalBar',
            axisYType: "secondary",
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 500
                        }
                    }]
                }
            },
            data: {
                labels: labelsMeses,
                datasets: [{
                    label: "Promedio de Espectadores por Mes",
                    backgroundColor: "rgba(253,141,60, 0.7)",
                    borderColor: "rgba(253,141,60, 0.7)",
                    pointBorderColor: "rgba(253,141,60, 0.7)",
                    pointBackgroundColor: "rgba(253,141,60, 0.7)",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointBorderWidth: 1,
                    data: promediosMes
                }]
            },
        });
    }
}