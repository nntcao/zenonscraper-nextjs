import styles from './HoldersChart.module.scss'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
  
export default function HoldersChart(props) {
    var data = {
        labels: ['5/5/2022', '5/4/2022', '5/3/2022'],
        datasets: [{
            label: 'Holders',
            backgroundColor: 'rgb(255, 99, 132)',
            data: [3, 4, 5],
            borderColor: 'rgb(255, 99, 132)',
        }]
    }

    var options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Holder Count Over Last 30 Days',
          },
        },      
    }

    return (
        <Line data={data} options={options}/>
    )
}