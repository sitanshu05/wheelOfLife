import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import colors from "../data/fixed/polarChartColors"

interface PolarChartProps {
  data: number[];
}

const SmallPolarChart: React.FC<PolarChartProps> = ({ data}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    if (ctx) {
      const chartInstance = new Chart(ctx, {
        type: 'polarArea',
        data: {
          datasets: [
            {
              data: data,
              backgroundColor: colors,
              borderColor: colors,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            r: {
                min: -5,
                max: 10,
                pointLabels : {
                    display : false,
                    backdropColor:"red"
                },
                ticks : {
                    display : false
                },
                grid: {
                  display : false
                },
            },
          },
          plugins: {
            legend: {
              display : false
            },
            title :{
                display:false
            },
            datalabels: {
              color: '#e6e3e3',
              anchor: "center",
              align: 'center',
              display : false,
              font: {
                family : "Outfit",
                size: 12,
                style : "normal"
              },
            }
          },
          
          events : []
        },
        plugins: [ChartDataLabels],
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default SmallPolarChart;
