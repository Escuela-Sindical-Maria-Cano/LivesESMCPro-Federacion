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