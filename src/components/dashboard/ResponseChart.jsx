import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import '../../styles/dashboardStyles/ResponceChart.css';

const formatTrendData = (rawData) => {
  return rawData.map(item => {
    const { year, month } = item._id;
    return {
      name: `${month}/${year}`,
      responses: item.count
    };
  });
};

const ResponseChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const formattedData = formatTrendData(data);

  return (
    <div className="response-chart">
      <h3>Survey Responses Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fill: '#7f8c8d' }} />
          <YAxis tick={{ fill: '#7f8c8d' }} />
          <Tooltip
            contentStyle={{
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #eee',
              borderRadius: '0.5rem',
              padding: '0.5rem'
            }}
          />
          <Legend />
          <Bar
            dataKey="responses"
            name="Responses"
            fill="#3498db"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResponseChart;
