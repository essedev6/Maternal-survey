import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../../styles/analyticsStyles/TimeSeriesChart.css';

const TimeSeriesChart = ({ data, title }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="time-series-chart">
      <h4>{title || 'Responses Over Time'}</h4>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#7f8c8d' }}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis tick={{ fill: '#7f8c8d' }} />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #eee',
                borderRadius: '0.5rem',
                padding: '0.5rem'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="count" 
              name="Responses"
              stroke="#3498db" 
              strokeWidth={2}
              dot={{ fill: '#3498db', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#2980b9' }}
            />
            <Line 
              type="monotone" 
              dataKey="completionRate" 
              name="Completion Rate (%)"
              stroke="#2ecc71" 
              strokeWidth={2}
              dot={{ fill: '#2ecc71', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#27ae60' }}
              yAxisId="right"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimeSeriesChart;