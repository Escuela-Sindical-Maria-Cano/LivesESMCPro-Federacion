$(document).ready(function() {
    leerJSON();
});

var infolives;

function leerJSON() {
    $.getJSON('datos/infolives.json', function(data) {
        infolives = data;
        calcularIndicadoresCalidadTecnologica();
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