$(document).ready(function() {
    leerJSON();
});

var infoFacebookLives;
var labelsFechas = [];
var picoValues = [];
var minutosReproducidosValues = [];
var promedioReproduccionValues = [];
var numeroEspectadoresLive = [];

var sumaEspectadoresMes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var presentacionesMes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var localizacionesActuales = [];
var localizacionesAcumuladas = {};
var cantidad_espectadores_semana_actual = 0;
var localizacionesMapaAcumuladas = new Map();

var infoYoutubeLives;
var labelsYoutubeFechas = [];
var picoYoutubeValues = [];
var minutosReproducidosYoutubeValues = [];
var promedioReproduccionYoutubeValues = [];
var numeroEspectadoresYoutubeLive = [];

var sumaEspectadoresMesYoutube = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var presentacionesMesYoutube = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var cantidad_espectadores_youtube_semana_actual = 0;

function leerJSON() {
    $.getJSON('datos/infoFacebookLives.json', function(data) {
        infoFacebookLives = data;
        calcularIndicadoresCalidadAlcance();
        chartAlcanceEspectadores();
        tablaTopLocalizaciones();
        tablaTopLocalizacionesAcumulados();
    });
    $.getJSON('datos/infoYoutubeLives.json', function(data) {
        infoYoutubeLives = data;
        calcularIndicadoresCalidadAlcanceYotube();
        chartAlcanceEspectadoresYoutube();
    });
}

function calcularIndicadoresCalidadAlcance() {
    var cantidad_total_espectadores = 0;
    var cantidad_espectadores_semana_pasada = 0;
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
    var i_max = Object.keys(infoFacebookLives).length;
    $.each(infoFacebookLives, function() {
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
        localizacionesAcumuladas = parsearLocalizacionAcumular(localizacionesAcumuladas, this.localizacion, this.cantidad_espectadores_live);
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
            cantidad_comentarios_semana_actual = this.total_comentarios_live;
            cantidad_compartidos_semana_actual = this.total_compartidos;
            cantidad_interacciones_semana_actual = this.total_interacciones;
            fecha_semana_actual = this.fecha;
            localizacionesActuales = parsearLocalizacion(this.localizacion);
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

function calcularIndicadoresCalidadAlcanceYotube() {
    var cantidad_total_espectadores = 0;
    var cantidad_espectadores_semana_pasada = 0;
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
    var i_max = Object.keys(infoYoutubeLives).length;
    $.each(infoYoutubeLives, function() {
        cantidad_total_espectadores += this.cantidad_espectadores_live;
        promedio_tiempo_aire += this.total_minutos_aire;
        promedio_pico_espectadores += this.pico_espectadores_concurrentes;
        labelsYoutubeFechas.push(this.fecha);
        picoYoutubeValues.push(this.pico_espectadores_concurrentes);
        minutosReproducidosYoutubeValues.push(this.total_minutos_vistos_transmision);
        promedioReproduccionYoutubeValues.push(this.promedio_minutos_reproducion);
        numeroEspectadoresYoutubeLive.push(this.cantidad_espectadores_live);
        var indiceFecha = obtenerIndiceFecha(this.fecha, "dd-mm-yyyy", "-");
        cantidad_total_espectadores += this.cantidad_espectadores_live;
        sumaEspectadoresMesYoutube[indiceFecha] += this.cantidad_espectadores_live;
        presentacionesMesYoutube[indiceFecha]++;
        if (i_max - 2 === i) {
            cantidad_espectadores_semana_pasada = this.cantidad_espectadores_live;
            tiempo_aire_semana_pasada = this.total_minutos_aire;
            porcentaje_mujeres_semana_pasada = this.porcentaje_mujeres;
            porcentaje_hombres_semana_pasada = this.porcentaje_hombres;
            pico_espectadores_semana_pasada = this.pico_espectadores_concurrentes;
        }
        if (i_max - 1 === i) {
            cantidad_espectadores_youtube_semana_actual = this.cantidad_espectadores_live;
            tiempo_aire_semana_actual = this.total_minutos_aire;
            porcentaje_mujeres_semana_actual = this.porcentaje_mujeres;
            porcentaje_hombres_semana_actual = this.porcentaje_hombres;
            pico_espectadores_semana_actual = this.pico_espectadores_concurrentes;
            cantidad_comentarios_semana_actual = this.total_comentarios_live;
            cantidad_compartidos_semana_actual = this.total_compartidos;
            cantidad_interacciones_semana_actual = this.total_me_gusta;
            fecha_semana_actual = this.fecha;
        }
        i++;
    });
    promedio_tiempo_aire = Math.round(promedio_tiempo_aire / i_max);
    promedio_pico_espectadores = Math.round(promedio_pico_espectadores / i_max);
    $("#youtube_ultimo_numero_espectadores").html(cantidad_espectadores_youtube_semana_actual);
    $("#youtube_ultimo_numero_comentarios").html(cantidad_comentarios_semana_actual);
    $("#youtube_ultimo_numero_compartidos").html(cantidad_compartidos_semana_actual);
    $("#youtube_ultimo_numero_interacciones").html(cantidad_interacciones_semana_actual);
    $(".youtube_fecha_ultimo_live").html(fecha_semana_actual);

}

function chartAlcanceEspectadoresYoutube() {
    if ($("#chart_youtube_alcance_todos").length) {
        console.log('Plot Alcance Todos');
        var ctx = document.getElementById("chart_youtube_alcance_todos");
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
                labels: labelsYoutubeFechas,
                datasets: [{
                    label: "Número de Espectadores",
                    backgroundColor: "rgba(253,141,60, 0.31)",
                    borderColor: "rgba(253,141,60, 0.7)",
                    pointBorderColor: "rgba(253,141,60, 0.7)",
                    pointBackgroundColor: "rgba(253,141,60, 0.7)",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointBorderWidth: 1,
                    data: numeroEspectadoresYoutubeLive
                }]
            },
        });
    }
    if ($("#chart_youtube_alcance_x_mes").length) {
        console.log('Plot Alcance X Mes');
        var labelsMeses = [];
        var promediosMes = [];
        var i = 0;
        $.each(sumaEspectadoresMesYoutube, function() {
            if (this > 0) {
                labelsMeses.push(meses[i]);
                promediosMes.push(Math.round(sumaEspectadoresMesYoutube[i] / presentacionesMesYoutube[i]));
            }
            i++;
        });

        var ctx = document.getElementById("chart_youtube_alcance_x_mes");
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
    if (typeof(jQuery.fn.vectorMap) === 'undefined') { return; }

    console.log('init_JQVmap');

    if ($('#mapa_espectadores').length) {

        $('#mapa_espectadores').vectorMap({
            map: 'co_mill',
            series: {
                regions: [{
                    values: localizacionesActuales,
                    scale: ['#ffeda0', '#f03b20'],
                    normalizeFunction: 'polynomial'
                }]
            },
            onRegionTipShow: function(e, el, code) {
                var valor = 0;
                if (typeof localizacionesActuales[code] !== "undefined") {
                    valor = localizacionesActuales[code];
                }
                el.html(el.html() + ' (Cantidad Espectadores - ' + valor + '%)');
            }
        });

    }
    if ($('#mapa_espectadores_acumulado').length) {

        $('#mapa_espectadores_acumulado').vectorMap({
            map: 'co_mill',
            series: {
                regions: [{
                    values: localizacionesAcumuladas,
                    scale: ['#ffeda0', '#f03b20'],
                    normalizeFunction: 'polynomial'
                }]
            },
            onRegionTipShow: function(e, el, code) {
                var valor = 0;
                if (typeof localizacionesAcumuladas[code] !== "undefined") {
                    valor = localizacionesAcumuladas[code];
                }
                el.html(el.html() + ' (Cantidad Espectadores - ' + valor + '%)');
            }
        });

    }
}

function tablaTopLocalizaciones() {
    var i_ultima = Object.keys(infoFacebookLives).length - 1;
    var top1 = infoFacebookLives[i_ultima].localizacion[0].lugar;
    var top1Valor = infoFacebookLives[i_ultima].localizacion[0].valor;
    var top2 = "";
    var top2Valor = 0;
    var top3 = "";
    var top3Valor = 0;
    var top4 = "";
    var top4Valor = 0;
    var top5 = "";
    var top5Valor = 0;
    var i = 0;
    $.each(infoFacebookLives[i_ultima].localizacion, function() {
        if (i !== 0) {
            if (top1Valor <= this.valor) {
                top5 = top4;
                top5Valor = top4Valor;
                top4 = top3;
                top4Valor = top3Valor;
                top3 = top2;
                top3Valor = top2Valor;
                top2 = top1;
                top2Valor = top1Valor;
                top1 = this.lugar;
                top1Valor = this.valor;
            } else if (top2Valor <= this.valor) {
                top5 = top4;
                top5Valor = top4Valor;
                top4 = top3;
                top4Valor = top3Valor;
                top3 = top2;
                top3Valor = top2Valor;
                top2 = this.lugar;
                top2Valor = this.valor;
            } else if (top3Valor <= this.valor) {
                top5 = top4;
                top5Valor = top4Valor;
                top4 = top3;
                top4Valor = top3Valor;
                top3 = this.lugar;
                top3Valor = this.valor;
            } else if (top4Valor <= this.valor) {
                top5 = top4;
                top5Valor = top4Valor;
                top4 = this.lugar;
                top4Valor = this.valor;
            } else if (top5Valor <= this.valor) {
                top5 = this.lugar;
                top5Valor = this.valor;
            }
        }
        i++;
    });
    if (top1Valor > 0) {
        $("#top1_localizacion").html(top1);
        $("#top1_localizacion_value").html(Math.round(top1Valor * cantidad_espectadores_semana_actual / 100));
    }
    if (top2Valor > 0) {
        $("#top2_localizacion").html(top2);
        $("#top2_localizacion_value").html(Math.round(top2Valor * cantidad_espectadores_semana_actual / 100));
    }
    if (top3Valor > 0) {
        $("#top3_localizacion").html(top3);
        $("#top3_localizacion_value").html(Math.round(top3Valor * cantidad_espectadores_semana_actual / 100));
    }
    if (top4Valor > 0) {
        $("#top4_localizacion").html(top4);
        $("#top4_localizacion_value").html(Math.round(top4Valor * cantidad_espectadores_semana_actual / 100));
    }
    if (top5Valor > 0) {
        $("#top5_localizacion").html(top5);
        $("#top5_localizacion_value").html(Math.round(top5Valor * cantidad_espectadores_semana_actual / 100));
    }
}

function tablaTopLocalizacionesAcumulados() {
    var top1 = localizacionesMapaAcumuladas.keys().next().value;
    var top1Valor = localizacionesMapaAcumuladas.values().next().value;
    var top2 = "";
    var top2Valor = 0;
    var top3 = "";
    var top3Valor = 0;
    var top4 = "";
    var top4Valor = 0;
    var top5 = "";
    var top5Valor = 0;
    var i = 0;
    localizacionesMapaAcumuladas.forEach(function(value, key) {
        if (i !== 0) {
            if (top1Valor <= value) {
                top5 = top4;
                top5Valor = top4Valor;
                top4 = top3;
                top4Valor = top3Valor;
                top3 = top2;
                top3Valor = top2Valor;
                top2 = top1;
                top2Valor = top1Valor;
                top1 = key;
                top1Valor = value;
            } else if (top2Valor <= value) {
                top5 = top4;
                top5Valor = top4Valor;
                top4 = top3;
                top4Valor = top3Valor;
                top3 = top2;
                top3Valor = top2Valor;
                top2 = key;
                top2Valor = value;
            } else if (top3Valor <= value) {
                top5 = top4;
                top5Valor = top4Valor;
                top4 = top3;
                top4Valor = top3Valor;
                top3 = key;
                top3Valor = value;
            } else if (top4Valor <= value) {
                top5 = top4;
                top5Valor = top4Valor;
                top4 = key;
                top4Valor = value;
            } else if (top5Valor <= value) {
                top5 = key;
                top5Valor = value;
            }
        }
        i++;
    });
    if (top1Valor > 0) {
        $("#top1_localizacion_acumulado").html(top1);
        $("#top1_localizacion_acumulado_value").html(Math.round(top1Valor));
    }
    if (top2Valor > 0) {
        $("#top2_localizacion_acumulado").html(top2);
        $("#top2_localizacion_acumulado_value").html(Math.round(top2Valor));
    }
    if (top3Valor > 0) {
        $("#top3_localizacion_acumulado").html(top3);
        $("#top3_localizacion_acumulado_value").html(Math.round(top3Valor));
    }
    if (top4Valor > 0) {
        $("#top4_localizacion_acumulado").html(top4);
        $("#top4_localizacion_acumulado_value").html(Math.round(top4Valor));
    }
    if (top5Valor > 0) {
        $("#top5_localizacion_acumulado").html(top5);
        $("#top5_localizacion_acumulado_value").html(Math.round(top5Valor));
    }
}