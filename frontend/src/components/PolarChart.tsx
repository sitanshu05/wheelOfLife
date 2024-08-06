import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface PolarChartProps {
  data: number[];
  labels: string[];
  backgroundColors: string[];
  borderColors: string[];
  improvements : string[]
}

const PolarChart: React.FC<PolarChartProps> = ({ data, labels, backgroundColors, borderColors, improvements }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    if (ctx) {
      const chartInstance = new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
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
                }
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
              formatter: (value: number, context: any) => {
                return context.chart.data.labels[context.dataIndex] + "\n" + " ".repeat(context.chart.data.labels[context.dataIndex].length) + value;
              },
              font: {
                family : "Outfit",
                size: 12,
                style : "normal"
              },
            },
            tooltip : {
                callbacks : {
                    label : (tooltipItem) => {
                        const index = tooltipItem.dataIndex;

                        return `${data[index]}\n${improvements[index]}`;
                    }
                },
                
            }
          }
        },
        plugins: [ChartDataLabels],
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [data, labels, backgroundColors, borderColors]);

  return <canvas ref={chartRef} />;
};

export default PolarChart;
