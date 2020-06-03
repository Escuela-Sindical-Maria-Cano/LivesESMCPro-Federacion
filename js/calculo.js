$(document).ready(function() {
    leerJSON();
});

var infolives;
var labelsFechas = [];
var picoValues = [];
var minutosReproducidosValues = [];
var promedioReproduccionValues = [];

function leerJSON() {
    $.getJSON('datos/infolives.json', function(data) {
        infolives = data;
        calcularIndicadoresCalidadTecnologica();
        chartRendimientoRed();
        chartCalidadTecnologica();
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
    var i_max = Object.keys(infolives).length;
    $.each(infolives, function() {
        cantidad_total_espectadores += this.cantidad_espectadores_live;
        promedio_tiempo_aire += this.total_minutos_aire;
        promedio_pico_espectadores += this.pico_espectadores_concurrentes;
        labelsFechas.push(this.fecha);
        picoValues.push(this.pico_espectadores_concurrentes);
        minutosReproducidosValues.push(this.total_minutos_vistos_transmision);
        promedioReproduccionValues.push(this.promedio_minutos_reproducion);
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

function calculoVariacionPositiva(actual, pasada, id) {
    var variacion = Math.round((actual - pasada) / pasada * 100);
    $("#" + id).html('<i class="green"><i class="fa fa-sort-asc"></i><i class="green">' + variacion + '% </i> la semana pasada');

}

function calculoVariacionNegativa(actual, pasada, id) {
    var variacion = Math.round((pasada - actual) / pasada * 100);
    $("#" + id).html('<i class="red"><i class="fa fa-sort-desc"></i><i class="red">' + variacion + '% </i> la semana pasada');

}

function stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var year = parseInt(dateItems[yearIndex]);
    // adjust for 2 digit year
    if (year < 100) { year += 2000; }
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(year, month, dateItems[dayIndex]);
    return formatedDate;
}


function chartRendimientoRed() {
    var fotogramas_enviados = [];
    var top1 = infolives[0].fecha;
    var top1Valor = infolives[0].porcentaje_fotograma_enviados;
    var top2 = "";
    var top2Valor = 0;
    var top3 = "";
    var top3Valor = 0;
    var top4 = "";
    var top4Valor = 0;
    var i = 0;
    $.each(infolives, function() {
        var fechaLive = stringToDate(this.fecha, 'dd-mm-yyyy', '-').getTime();
        fotogramas_enviados.push([fechaLive, this.porcentaje_fotograma_enviados]);
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

    var chart_rendimiento_red_settings = {
        series: {
            lines: {
                show: false,
                fill: false
            },
            splines: {
                show: true,
                tension: 0.4,
                lineWidth: 1
            },
            points: {
                radius: 0,
                show: true
            },
            shadowSize: 2
        },
        grid: {
            verticalLines: true,
            hoverable: true,
            clickable: true,
            tickColor: "#d5d5d5",
            borderWidth: 1,
            color: '#fff'
        },
        colors: ["rgba(38, 185, 154, 0.38)"],
        xaxis: {
            tickColor: "rgba(51, 51, 51, 0.06)",
            mode: "time",
            tickSize: [7, "day"],
            //tickLength: 10,
            axisLabel: "Date",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Verdana, Arial',
            axisLabelPadding: 10
        },
        yaxis: {
            ticks: 8,
            tickColor: "rgba(51, 51, 51, 0.06)",
            min: 0,
            max: 100

        },
        tooltip: true
    }


    if ($("#chart_rendimiento_red").length) {
        console.log('Plot rendimiendo red');

        $.plot($("#chart_rendimiento_red"), [fotogramas_enviados], chart_rendimiento_red_settings);
    }
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
    if ($('#chart_distribucion_pico').length) {
        var ctx = document.getElementById("chart_distribucion_pico");
        var lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labelsFechas,
                datasets: [{
                    label: "Pico de espectadores concurrentes",
                    backgroundColor: "rgba(38, 185, 154, 0.31)",
                    borderColor: "rgba(38, 185, 154, 0.7)",
                    pointBorderColor: "rgba(38, 185, 154, 0.7)",
                    pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
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
            data: {
                labels: labelsFechas,
                datasets: [{
                    label: "Minutos Reproducidos",
                    backgroundColor: "rgba(38, 185, 154, 0.31)",
                    borderColor: "rgba(38, 185, 154, 0.7)",
                    pointBorderColor: "rgba(38, 185, 154, 0.7)",
                    pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
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
            data: {
                labels: labelsFechas,
                datasets: [{
                    label: "Promedio de Minutos Reproducidos",
                    backgroundColor: "rgba(38, 185, 154, 0.31)",
                    borderColor: "rgba(38, 185, 154, 0.7)",
                    pointBorderColor: "rgba(38, 185, 154, 0.7)",
                    pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointBorderWidth: 1,
                    data: promedioReproduccionValues
                }]
            },
        });

    }
}