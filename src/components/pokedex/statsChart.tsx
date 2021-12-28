import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

interface Props {
  labels: string[];
  data: number[];
}

const StatsChart = ({ labels, data }: Props) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'stats',
        data,
        backgroundColor: 'rgba(220, 20, 60, 0.4)',
        borderColor: 'rgb(220, 20, 60)',
        borderWidth: 1,
      },
    ],
    scale: {
      min: 0,
      max: 100,
      stepSize: 10,
    },
    ticks: {
      min: 0,
      max: 100,
      stepSize: 10,
    },
  };

  return (
    <Radar
      data={chartData}
      options={
        {
          scaleFontColor: 'red',
          scale: {
            min: 0,
            max: 100,
            stepSize: 10,
          },
          scales: {
            r: {
              ticks: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: 'black',
                font: {
                  size: 24,
                },
              },
            },
          },
        } as unknown
      }
    />
  );
};

export default StatsChart;
