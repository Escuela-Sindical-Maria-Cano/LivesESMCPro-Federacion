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

function chartCalidadEstrategia() {
    if ($('#calidad_estrategia_plan').length) {

        var echartGauge = echarts.init(document.getElementById('calidad_estrategia_plan'), themeEchart);

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

        var echartGauge = echarts.init(document.getElementById('calidad_identidad'), themeEchart);

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

        var echartLine = echarts.init(document.getElementById('chart_retroalimentacion_comentario'), themeEchart);

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