import styles from './HashRateChart.module.scss'
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
  
function HashRateChart(props) {
    var data = {
        labels: ['5/5/2022', '5/4/2022', '5/3/2022'],
        datasets: [{
            label: 'Hash Rate',
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
            text: 'Hash Rate',
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

export default HashRateChart
