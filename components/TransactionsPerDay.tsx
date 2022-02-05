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
      legend: {
        display: false,
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

export default function TransactionsPerDayChart(props) {

    const formatData = (data) => {
        return data.map((el) => {
            return {
                x: time.timeConvertorDayOnly(el.time),
                y: el.transactioncount
            }
        })
    }

    const data: any = {
        datasets: [
            {
                // label for our chart
                label: 'Transactions',
                fill: true,
                data: formatData(props.data),
        
                // color of the line chart
                borderColor: '#00C800',
                // partially transparent part below our line graph
                backgroundColor: '#00C800',
                borderWidth: 3,
                pointRadius: props.pointRadius,
                pointHoverRadius: 5,
                borderCapStyle: 'butt',
                pointHoverBackgroundColor: '#00C800',
                pointHoverBorderColor: '#00C800',
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