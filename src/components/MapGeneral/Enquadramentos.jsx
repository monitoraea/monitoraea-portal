import { useState, useEffect } from 'react';

import ReactApexChart from 'react-apexcharts'

import axios from 'axios';
import { useQuery } from 'react-query';

export default function ApexChart({ staleTime = 3600000, /* 1h */ }) {
    const [state, _state] = useState(null);

    const { data: enquadramentos } = useQuery(['enquadramentos'], {
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}adm/statistics/enquadramentos`)).data,
        staleTime,
    })

    useEffect(() => {
        if (!!enquadramentos) {
            _state({

                series: [{
                    data: enquadramentos.data
                }],
                options: {
                    chart: {
                        type: 'bar',
                        width: "100%",
                        height: 'auto',
                        foreColor: '#373d3f', // TODO: cor da fonte

                        toolbar: {
                            show: false,
                        }
                    },
                    colors: ['#2d8bba'],
                    plotOptions: {
                        bar: {
                            borderRadius: 4,
                            borderRadiusApplication: 'end',
                            horizontal: true,
                            barHeight: '90%',
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    xaxis: {
                        categories: enquadramentos.categories,
                    },
                    yaxis: {
                        labels: {
                            maxWidth: 500,
                            style: {
                                colors: ['#051e59'],
                                fontSize: '14px',
                                fontFamily: 'Poppins',
                                fontWeight: 500,
                                cssClass: 'apexcharts-xaxis-label',
                            },
                        },
                    },
                    grid: {
                        show: false,
                    },
                    tooltip: {
                        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                            return (
                                '<div class="arrow_box">' +
                                "<span>" +
                                w.globals.labels[dataPointIndex] +
                                ": " +
                                series[seriesIndex][dataPointIndex] +
                                "</span>" +
                                "</div>"
                            );
                        }
                    },
                },
            })
        }

    }, [enquadramentos])

    if (!state) return <></>

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="bar" height={250} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}