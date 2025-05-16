import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import '../../styles/dashboardStyles/DemographicChart.css';

const COLORS = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#34495e'];

const DemographicChart = ({ title = 'Demographic Distribution', data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="demographic-chart">
        <h3>{title}</h3>
        <p>No demographic data available.</p>
      </div>
    );
  }

  // Format backend data: _id -> label, count -> value
  const formattedData = data.map((item) => ({
    name: item._id ? item._id : 'Unknown',
    value: item.count || 0,
  }));

  return (
    <div className="demographic-chart">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            nameKey="name"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #eee',
              borderRadius: '0.5rem',
              padding: '0.5rem',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DemographicChart;



