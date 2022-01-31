import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import * as time from '../utils/time'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
    
const config = {
    plugins: {
  
      // show legends for our graph
      legend: {
        display: true,
      },
    },
    lineHeightAnnotation: {
      always: true,
      lineWeight: 1.5,
    },
  
  //   animate in
    animation: {
      duration: 1,
    },
    maintainAspectRatio: false,
    responsive: true,
  
  //   show the x and y scales
    scales: {
      x: { display: true },
      y: { display: true },
    },
};

export default function AvgPlasmaPerDayChart(props) {

    const formatData = (data) => {
        return data.map((el) => {
            return {
                x: time.timeConvertorDayOnly(el.time),
                y: el.plasmaaverage
            }
        })
    }

    const data: any = {
        datasets: [
            {
                // label for our chart
                label: 'Average Plasma',
                fill: true,
                data: formatData(props.data),
        
                // color of the line chart
                borderColor: '#3B82F6',
                // partially transparent part below our line graph
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderWidth: 3,
                pointRadius: props.pointRadius,
                pointHoverRadius: 5,
                borderCapStyle: 'butt',
                pointHoverBackgroundColor: 'rgba(59, 130, 246, 1)',
                pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
                pointHoverBorderWidth: 2
            }
        ]
    };
    
    return (
        <div className="chart-container">
            <Line data={data} options={config} />
        </div>
    )
}