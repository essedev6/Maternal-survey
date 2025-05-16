import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const EmploymentChart = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No employment data available.</div>;
  }

  // Adapt to backend format where status is stored in _id
  const chartData = {
    labels: data.map((item) => item._id),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCD56', '#9b59b6', '#2ecc71'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCD56', '#9b59b6', '#2ecc71'],
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Employment Status'
      },
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div className="employment-chart">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default EmploymentChart;


