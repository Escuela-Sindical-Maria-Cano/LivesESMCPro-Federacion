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

var themeEchart = {
    color: [
        '#34495E', '#ff7f00', '#BDC3C7', '#e41a1c',
        '#9B59B6', '#8abb6f', '#759c6a', '#bfd3b7'
    ],

    title: {
        itemGap: 8,
        textStyle: {
            fontWeight: 'normal',
            color: '#408829'
        }
    },

    dataRange: {
        color: ['#1f610a', '#97b58d']
    },

    toolbox: {
        color: ['#408829', '#408829', '#408829', '#408829']
    },

    tooltip: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: '#408829',
                type: 'dashed'
            },
            crossStyle: {
                color: '#408829'
            },
            shadowStyle: {
                color: 'rgba(200,200,200,0.3)'
            }
        }
    },

    dataZoom: {
        dataBackgroundColor: '#eee',
        fillerColor: 'rgba(64,136,41,0.2)',
        handleColor: '#408829'
    },
    grid: {
        borderWidth: 0
    },

    categoryAxis: {
        axisLine: {
            lineStyle: {
                color: '#408829'
            }
        },
        splitLine: {
            lineStyle: {
                color: ['#eee']
            }
        }
    },

    valueAxis: {
        axisLine: {
            lineStyle: {
                color: '#408829'
            }
        },
        splitArea: {
            show: true,
            areaStyle: {
                color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
            }
        },
        splitLine: {
            lineStyle: {
                color: ['#eee']
            }
        }
    },
    timeline: {
        lineStyle: {
            color: '#408829'
        },
        controlStyle: {
            normal: { color: '#408829' },
            emphasis: { color: '#408829' }
        }
    },

    k: {
        itemStyle: {
            normal: {
                color: '#68a54a',
                color0: '#a9cba2',
                lineStyle: {
                    width: 1,
                    color: '#408829',
                    color0: '#86b379'
                }
            }
        }
    },
    map: {
        itemStyle: {
            normal: {
                areaStyle: {
                    color: '#ddd'
                },
                label: {
                    textStyle: {
                        color: '#c12e34'
                    }
                }
            },
            emphasis: {
                areaStyle: {
                    color: '#99d2dd'
                },
                label: {
                    textStyle: {
                        color: '#c12e34'
                    }
                }
            }
        }
    },
    force: {
        itemStyle: {
            normal: {
                linkStyle: {
                    strokeColor: '#408829'
                }
            }
        }
    },
    chord: {
        padding: 4,
        itemStyle: {
            normal: {
                lineStyle: {
                    width: 1,
                    color: 'rgba(128, 128, 128, 0.5)'
                },
                chordStyle: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    }
                }
            },
            emphasis: {
                lineStyle: {
                    width: 1,
                    color: 'rgba(128, 128, 128, 0.5)'
                },
                chordStyle: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    }
                }
            }
        }
    },
    gauge: {
        startAngle: 225,
        endAngle: -45,
        axisLine: {
            show: true,
            lineStyle: {
                color: [
                    [0.2, '#86b379'],
                    [0.8, '#68a54a'],
                    [1, '#408829']
                ],
                width: 8
            }
        },
        axisTick: {
            splitNumber: 10,
            length: 12,
            lineStyle: {
                color: 'auto'
            }
        },
        axisLabel: {
            textStyle: {
                color: 'auto'
            }
        },
        splitLine: {
            length: 18,
            lineStyle: {
                color: 'auto'
            }
        },
        pointer: {
            length: '90%',
            color: 'auto'
        },
        title: {
            textStyle: {
                color: '#333'
            }
        },
        detail: {
            textStyle: {
                color: 'auto'
            }
        }
    },
    textStyle: {
        fontFamily: 'Arial, Verdana, sans-serif'
    }
};


function parsearLocalizacion(localizacionOrigen) {
    var json = {};
    $.each(localizacionOrigen, function () {
        json[localizaciones.get(this.lugar)] = this.valor;
    });
    return json;
}

function parsearLocalizacionAcumular(localizacionesReferencia, localizacionOrigen, cantidadEspectadores) {
    $.each(localizacionOrigen, function () {
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
    var variacion = 0;
    if (pasada !== 0) {
        variacion = Math.round((actual - pasada) / pasada * 100);
    }
    $("#" + id).html('<i class="green"><i class="fa fa-sort-asc"></i><i class="green">' + variacion + '% </i> la semana pasada');

}

function calculoVariacionNegativa(actual, pasada, id) {
    var variacion = 0;
    if (pasada !== 0) {
        variacion = Math.round((pasada - actual) / pasada * 100);
    }
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
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});
