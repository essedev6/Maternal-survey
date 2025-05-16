import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import '../../styles/dashboardStyles/incomeDistributionChart.css';


// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeDistributionChart = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No income distribution data available.</div>;
  }

  // Format data from backend (_id is the income range)
  const formattedData = data.map((item) => ({
    range: item._id,
    count: item.count
  }));

  const chartData = {
    labels: formattedData.map((item) => item.range),
    datasets: [
      {
        label: 'Income Distribution',
        data: formattedData.map((item) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Income Distribution'
      },
      legend: {
        position: 'top'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Income Range'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Respondents'
        }
      }
    }
  };

  return (
    <div className="income-distribution-chart">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default IncomeDistributionChart;


