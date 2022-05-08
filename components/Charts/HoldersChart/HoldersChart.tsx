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
  
function HoldersChart(props) {
    var data = {
        labels: ['5/5/2022', '5/4/2022', '5/3/2022'],
        datasets: [{
            label: 'Holders',
            backgroundColor: '#0AB30E',
            data: [3, 4, 5],
            borderColor: '#0AB30E',
        }]
    }

    var options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Holder Count Over Last 30 Days',
          },
          legend: {
              display: false,
          }
        },      
    }

    return (
        <Line data={data} options={options}/>
    )
}

export default HoldersChart