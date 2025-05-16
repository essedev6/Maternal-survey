import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend
} from 'recharts';
import '../../styles/dashboardStyles/CulturalAnalysis.css';

const CulturalAnalysis = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="cultural-analysis">
        <h3>Cultural Factors Analysis</h3>
        <p>No cultural data available.</p>
      </div>
    );
  }

  const formattedData = data.map(item => ({
    subject: item._id,
    importance: item.importance,
    prevalence: item.prevalence
  }));

  return (
    <div className="cultural-analysis">
      <h3>Cultural Factors Analysis</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart outerRadius={90} data={formattedData}>
          <PolarGrid />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#2c3e50' }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #eee',
              borderRadius: '0.5rem',
              padding: '0.5rem'
            }}
          />
          <Radar
            name="Importance"
            dataKey="importance"
            stroke="#3498db"
            fill="#3498db"
            fillOpacity={0.6}
          />
          <Radar
            name="Prevalence"
            dataKey="prevalence"
            stroke="#e74c3c"
            fill="#e74c3c"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CulturalAnalysis;
