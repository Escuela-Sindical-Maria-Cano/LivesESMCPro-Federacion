$(document).ready(function() {
    leerJSON();
});

var infoYoutubeLives;
var labelsFechas = [];
var picoValues = [];
var minutosReproducidosValues = [];
var promedioReproduccionValues = [];
var fotogramas_enviados = [];

function leerJSON() {
    $.getJSON('datos/infoYoutubeLives.json', function(data) {
        infoYoutubeLives = data;
        calcularIndicadoresCalidadTecnologica();
        chartCalidadTecnologica();
        chartRendimientoRed();
    });
}

function calcularIndicadoresCalidadTecnologica() {
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
    var i = 0;
    var i_max = Object.keys(infoYoutubeLives).length;
    $.each(infoYoutubeLives, function() {
        cantidad_total_espectadores += this.cantidad_espectadores_live;
        promedio_tiempo_aire += this.total_minutos_aire;
        promedio_pico_espectadores += this.pico_espectadores_concurrentes;
        labelsFechas.push(this.fecha);
        picoValues.push(this.pico_espectadores_concurrentes);
        minutosReproducidosValues.push(this.total_minutos_vistos_transmision);
        promedioReproduccionValues.push(this.promedio_minutos_reproducion);
        fotogramas_enviados.push(this.porcentaje_fotograma_enviados);
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
        }
        i++;
    });
    promedio_tiempo_aire = Math.round(promedio_tiempo_aire / i_max);
    promedio_pico_espectadores = Math.round(promedio_pico_espectadores / i_max);
    var promedio_espectadores = Math.round(cantidad_total_espectadores / i_max);
    $("#total_espectadores").html(cantidad_total_espectadores);
    if (cantidad_espectadores_semana_actual >= cantidad_espectadores_semana_pasada) {
        calculoVariacionPositiva(cantidad_espectadores_semana_actual, cantidad_espectadores_semana_pasada, "variacion_total_espectadores");
    } else {
        calculoVariacionNegativa(cantidad_espectadores_semana_actual, cantidad_espectadores_semana_pasada, "variacion_total_espectadores");

    }
    $("#promedio_tiempo_al_aire").html(promedio_tiempo_aire);
    if (tiempo_aire_semana_actual >= tiempo_aire_semana_pasada) {
        calculoVariacionPositiva(tiempo_aire_semana_actual, tiempo_aire_semana_pasada, "variacion_promedio_tiempo_al_aire");
    } else {
        calculoVariacionNegativa(tiempo_aire_semana_actual, tiempo_aire_semana_pasada, "variacion_promedio_tiempo_al_aire");
    }
    $("#porcentaje_mujeres").html(porcentaje_mujeres_semana_actual);
    if (porcentaje_mujeres_semana_actual >= porcentaje_mujeres_semana_pasada) {
        calculoVariacionPositiva(porcentaje_mujeres_semana_actual, porcentaje_mujeres_semana_pasada, "variacion_porcentaje_mujeres");
    } else {
        calculoVariacionNegativa(porcentaje_mujeres_semana_actual, porcentaje_mujeres_semana_pasada, "variacion_porcentaje_mujeres");
    }
    $("#porcentaje_hombres").html(porcentaje_hombres_semana_actual);
    if (porcentaje_hombres_semana_actual >= porcentaje_hombres_semana_pasada) {
        calculoVariacionPositiva(porcentaje_hombres_semana_actual, porcentaje_hombres_semana_pasada, "variacion_porcentaje_hombres");
    } else {
        calculoVariacionNegativa(porcentaje_hombres_semana_actual, porcentaje_hombres_semana_pasada, "variacion_porcentaje_hombres");
    }
    $("#promedio_pico_espectadores").html(promedio_pico_espectadores);
    if (pico_espectadores_semana_actual >= pico_espectadores_semana_pasada) {
        calculoVariacionPositiva(pico_espectadores_semana_actual, pico_espectadores_semana_pasada, "variacion_promedio_pico_espectadores");
    } else {
        calculoVariacionNegativa(pico_espectadores_semana_actual, pico_espectadores_semana_pasada, "variacion_promedio_pico_espectadores");
    }
    $("#promedio_espectadores").html(promedio_espectadores);
    if (cantidad_espectadores_semana_actual >= cantidad_espectadores_semana_pasada) {
        calculoVariacionPositiva(cantidad_espectadores_semana_actual, cantidad_espectadores_semana_pasada, "variacion_promedio_espectadores");
    } else {
        calculoVariacionNegativa(cantidad_espectadores_semana_actual, cantidad_espectadores_semana_pasada, "variacion_promedio_espectadores");

    }
}

function chartRendimientoRed() {
    var top1 = infoYoutubeLives[0].fecha;
    var top1Valor = infoYoutubeLives[0].porcentaje_fotograma_enviados;
    var top2 = "";
    var top2Valor = 0;
    var top3 = "";
    var top3Valor = 0;
    var top4 = "";
    var top4Valor = 0;
    var i = 0;
    $.each(infoYoutubeLives, function() {
        if (i !== 0) {
            if (top1Valor <= this.porcentaje_fotograma_enviados) {
                top4 = top3;
                top4Valor = top3Valor;
                top3 = top2;
                top3Valor = top2Valor;
                top2 = top1;
                top2Valor = top1Valor;
                top1 = this.fecha;
                top1Valor = this.porcentaje_fotograma_enviados;
            } else if (top2Valor <= this.porcentaje_fotograma_enviados) {
                top4 = top3;
                top4Valor = top3Valor;
                top3 = top2;
                top3Valor = top2Valor;
                top2 = this.fecha;
                top2Valor = this.porcentaje_fotograma_enviados;
            } else if (top3Valor <= this.porcentaje_fotograma_enviados) {
                top4 = top3;
                top4Valor = top3Valor;
                top3 = this.fecha;
                top3Valor = this.porcentaje_fotograma_enviados;
            } else if (top4Valor <= this.porcentaje_fotograma_enviados) {
                top4 = this.fecha;
                top4Valor = this.porcentaje_fotograma_enviados;
            }
        }
        i++;
    });
    if (top1Valor > 0) {
        $("#top1_transmision").html(top1);
        $("#top1_transmision_valor").attr("data-transitiongoal", top1Valor).progressbar();
    }
    if (top2Valor > 0) {
        $("#top2_transmision").html(top2);
        $("#top2_transmision_valor").attr("data-transitiongoal", top2Valor).progressbar();
    }
    if (top3Valor > 0) {
        $("#top3_transmision").html(top3);
        $("#top3_transmision_valor").attr("data-transitiongoal", top3Valor).progressbar();
    }
    if (top4Valor > 0) {
        $("#top4_transmision").html(top4);
        $("#top4_transmision_valor").attr("data-transitiongoal", top4Valor).progressbar();
    }
}

function chartCalidadTecnologica() {
    if ($("#chart_rendimiento_red").length) {
        console.log('Plot rendimiendo red');
        var ctx = document.getElementById("chart_rendimiento_red");
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
                    label: "Fotogramas enviados a la transmisión",
                    backgroundColor: "rgba(253,141,60, 0.31)",
                    borderColor: "rgba(253,141,60, 0.7)",
                    pointBorderColor: "rgba(253,141,60, 0.7)",
                    pointBackgroundColor: "rgba(253,141,60, 0.7)",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointBorderWidth: 1,
                    data: fotogramas_enviados
                }]
            },
        });
    }
    if ($('#chart_distribucion_pico').length) {
        var ctx = document.getElementById("chart_distribucion_pico");
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
                    label: "Pico de espectadores concurrentes",
                    backgroundColor: "rgba(253,141,60, 0.31)",
                    borderColor: "rgba(253,141,60, 0.7)",
                    pointBorderColor: "rgba(253,141,60, 0.7)",
                    pointBackgroundColor: "rgba(253,141,60, 0.7)",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointBorderWidth: 1,
                    data: picoValues
                }]
            },
        });

    }
    if ($('#chart_minutos_reproducidos').length) {
        var ctx = document.getElementById("chart_minutos_reproducidos");
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
                    label: "Minutos Reproducidos",
                    backgroundColor: "rgba(253,141,60, 0.31)",
                    borderColor: "rgba(253,141,60, 0.7)",
                    pointBorderColor: "rgba(253,141,60, 0.7)",
                    pointBackgroundColor: "rgba(253,141,60, 0.7)",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointBorderWidth: 1,
                    data: minutosReproducidosValues
                }]
            },
        });

    }
    if ($('#chart_promedio_reproduccion_video').length) {
        var ctx = document.getElementById("chart_promedio_reproduccion_video");
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
                    label: "Promedio de Minutos Reproducidos",
                    backgroundColor: "rgba(253,141,60, 0.31)",
                    borderColor: "rgba(253,141,60, 0.7)",
                    pointBorderColor: "rgba(253,141,60, 0.7)",
                    pointBackgroundColor: "rgba(253,141,60, 0.7)",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointBorderWidth: 1,
                    data: promedioReproduccionValues
                }]
            },
        });

    }
}