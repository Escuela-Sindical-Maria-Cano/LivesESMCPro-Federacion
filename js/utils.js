var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var localizaciones = new Map();
localizaciones.set("Valle del Cauca", "CO-VAC");
localizaciones.set("Bolívar", "CO-BOY");
localizaciones.set("Cesar", "CO-COR");
localizaciones.set("Huila", "CO-HUI");
localizaciones.set("Vaupés", "CO-VAU");
localizaciones.set("Norte de Santander", "CO-NSA");
localizaciones.set("Risaralda", "CO-RIS");
localizaciones.set("Vichada", "CO-VID");
localizaciones.set("Bogota", "CO-BOL");
localizaciones.set("Chocó", "CO-CUN");
localizaciones.set("Guaviare", "CO-GUV");
localizaciones.set("Casanare", "CO-CAU");
localizaciones.set("Caquetá", "CO-CAS");
localizaciones.set("Caldas", "CO-CAQ");
localizaciones.set("Cauca", "CO-CES");
localizaciones.set("Santander", "CO-SAN");
localizaciones.set("Atlántico", "CO-ATL");
localizaciones.set("Amazonas", "CO-AMA");
localizaciones.set("Meta", "CO-MET");
localizaciones.set("Magdalena", "CO-MAG");
localizaciones.set("Arauca", "CO-ARA");
localizaciones.set("Guainía", "CO-GUA");
localizaciones.set("San Andrés y Providencia", "CO-SAP");
localizaciones.set("Boyacá", "CO-CAL");
localizaciones.set("Quindío", "CO-QUI");
localizaciones.set("La Guajira", "CO-LAG");
localizaciones.set("Tolima", "CO-TOL");
localizaciones.set("Sucre", "CO-SUC");
localizaciones.set("Putumayo", "CO-PUT");
localizaciones.set("Nariño", "CO-NAR");
localizaciones.set("Córdoba", "CO-CHO");
localizaciones.set("Cundinamarca", "CO-DC");
localizaciones.set("Antioquia", "CO-ANT");

function parsearLocalizacion(localizacionOrigen) {
    var json = {};
    $.each(localizacionOrigen, function() {
        json[localizaciones.get(this.lugar)] = this.valor;
    });
    return json;
}

function parsearLocalizacionAcumular(localizacionesReferencia, localizacionOrigen, cantidadEspectadores) {
    $.each(localizacionOrigen, function() {
        if (typeof localizacionesReferencia[localizaciones.get(this.lugar)] === "undefined") {
            localizacionesReferencia[localizaciones.get(this.lugar)] = this.valor;
        } else {
            localizacionesReferencia[localizaciones.get(this.lugar)] += this.valor;
        }
        if (typeof localizacionesMapaAcumuladas.get(this.lugar) === "undefined") {
            localizacionesMapaAcumuladas.set(this.lugar, Math.round(this.valor * cantidadEspectadores / 100))
        } else {
            localizacionesMapaAcumuladas.set(this.lugar, localizacionesMapaAcumuladas.get(this.lugar) + Math.round(this.valor * cantidadEspectadores / 100));
        }
    });
    return localizacionesReferencia;
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

function obtenerIndiceFecha(_date, _format, _delimiter) {
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
    return month;
}