$(document).ready(function() {
    leerJSON();
});

var infolives;
var labelsFechas = [];
var cantidadComentariosPublicacion = [];
var cantidadComentariosLive = [];
var cantidadComentariosPostLive = [];
var cantidadComentariosInformales = [];
var porcentajePlanTransmision = 0;
var porcentajeLineamientosManual = 0;

function leerJSON() {
    $.getJSON('datos/infolives.json', function(data) {
        infolives = data;
        calcularIndicadoresCalidadCalidad();
        chartCalidadEstrategia();
        chartRetroalimentacionComentarios();
    });
}

function calcularIndicadoresCalidadCalidad() {
    var fecha_semana_actual = "";
    var i = 0;
    var i_max = Object.keys(infolives).length;
    $.each(infolives, function() {
        labelsFechas.push(this.fecha);
        cantidadComentariosPublicacion.push(this.total_comentarios_publicacion);
        cantidadComentariosLive.push(this.total_comentarios_live);
        cantidadComentariosPostLive.push(this.total_comentarios_post_live);
        cantidadComentariosInformales.push(this.total_comentarios_informales)
        if (this.tiene_plan_transmision) {
            porcentajePlanTransmision++
        }
        if (this.tiene_lineamientos_manual) {
            porcentajeLineamientosManual++
        }
        if (i_max - 2 === i) {}
        if (i_max - 1 === i) {}
        i++;
    });
    porcentajePlanTransmision = porcentajePlanTransmision / i_max;
    porcentajeLineamientosManual = porcentajeLineamientosManual / i_max;

}

var theme = {
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


function chartCalidadEstrategia() {
    if ($('#calidad_estrategia_plan').length) {

        var echartGauge = echarts.init(document.getElementById('calidad_estrategia_plan'), theme);

        echartGauge.setOption({
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [{
                name: 'Planeación',
                type: 'gauge',
                center: ['50%', '50%'],
                startAngle: 140,
                endAngle: -140,
                min: 0,
                max: 100,
                precision: 0,
                splitNumber: 10,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: [
                            [0.2, '#ff4500'],
                            [0.4, 'orange'],
                            [0.8, 'skyblue'],
                            [1, 'lightgreen']
                        ],
                        width: 40
                    }
                },
                axisTick: {
                    show: true,
                    splitNumber: 5,
                    length: 8,
                    lineStyle: {
                        color: '#eee',
                        width: 1,
                        type: 'solid'
                    }
                },
                axisLabel: {
                    show: true,
                    formatter: function(v) {
                        switch (v + '') {
                            case '10':
                                return 'D';
                            case '30':
                                return 'R';
                            case '60':
                                return 'B';
                            case '90':
                                return 'E';
                            default:
                                return '';
                        }
                    },
                    textStyle: {
                        color: '#333'
                    }
                },
                splitLine: {
                    show: true,
                    length: 30,
                    lineStyle: {
                        color: '#eee',
                        width: 2,
                        type: 'solid'
                    }
                },
                pointer: {
                    length: '80%',
                    width: 8,
                    color: 'auto'
                },
                title: {
                    show: true,
                    offsetCenter: ['0%', '-120%'],
                    textStyle: {
                        color: '#333',
                        fontSize: 15
                    }
                },
                detail: {
                    show: true,
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderWidth: 0,
                    borderColor: '#ccc',
                    width: 100,
                    height: 40,
                    offsetCenter: ['-60%', 10],
                    formatter: '{value}%',
                    textStyle: {
                        color: 'auto',
                        fontSize: 30
                    }
                },
                data: [{
                    value: Math.round(porcentajePlanTransmision * 100),
                    name: '¿Tiene plan de transmisión?'
                }]
            }]
        });

    }
    if ($('#calidad_identidad').length) {

        var echartGauge = echarts.init(document.getElementById('calidad_identidad'), theme);

        echartGauge.setOption({
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [{
                name: 'Planeación',
                type: 'gauge',
                center: ['50%', '50%'],
                startAngle: 140,
                endAngle: -140,
                min: 0,
                max: 100,
                precision: 0,
                splitNumber: 10,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: [
                            [0.2, '#ff4500'],
                            [0.4, 'orange'],
                            [0.8, 'skyblue'],
                            [1, 'lightgreen']
                        ],
                        width: 40
                    }
                },
                axisTick: {
                    show: true,
                    splitNumber: 5,
                    length: 8,
                    lineStyle: {
                        color: '#eee',
                        width: 1,
                        type: 'solid'
                    }
                },
                axisLabel: {
                    show: true,
                    formatter: function(v) {
                        switch (v + '') {
                            case '10':
                                return 'D';
                            case '30':
                                return 'R';
                            case '60':
                                return 'B';
                            case '90':
                                return 'E';
                            default:
                                return '';
                        }
                    },
                    textStyle: {
                        color: '#333'
                    }
                },
                splitLine: {
                    show: true,
                    length: 30,
                    lineStyle: {
                        color: '#eee',
                        width: 2,
                        type: 'solid'
                    }
                },
                pointer: {
                    length: '80%',
                    width: 8,
                    color: 'auto'
                },
                title: {
                    show: true,
                    offsetCenter: ['0%', '-120%'],
                    textStyle: {
                        color: '#333',
                        fontSize: 15
                    }
                },
                detail: {
                    show: true,
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderWidth: 0,
                    borderColor: '#ccc',
                    width: 100,
                    height: 40,
                    offsetCenter: ['-60%', 10],
                    formatter: '{value}%',
                    textStyle: {
                        color: 'auto',
                        fontSize: 30
                    }
                },
                data: [{
                    value: Math.round(porcentajeLineamientosManual * 100),
                    name: '¿Sigue lineamientos de la identidad corporativa?'
                }]
            }]
        });

    }
}

function chartRetroalimentacionComentarios() {
    if ($('#chart_retroalimentacion_comentario').length) {

        var echartLine = echarts.init(document.getElementById('chart_retroalimentacion_comentario'), theme);

        echartLine.setOption({
            title: {
                text: 'Comentarios en las transmisiones',
                subtext: 'Cantidad'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                x: 220,
                y: 40,
                data: ['Publicación', 'Live', 'Post-Live', 'Informal']
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        show: true,
                        title: {
                            line: 'Line',
                            bar: 'Bar',
                            stack: 'Stack',
                            tiled: 'Tiled'
                        },
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    restore: {
                        show: true,
                        title: "Restore"
                    },
                    saveAsImage: {
                        show: true,
                        title: "Save Image"
                    }
                }
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: labelsFechas
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: 'Publicación',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data: cantidadComentariosPublicacion
            }, {
                name: 'Live',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data: cantidadComentariosLive
            }, {
                name: 'Post-Live',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data: cantidadComentariosPostLive
            }, {
                name: 'Informal',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data: cantidadComentariosInformales
            }]
        });

    }
}