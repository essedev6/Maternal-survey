import { Table } from 'react-bootstrap';
import '../../styles/dashboardStyles/RecentResponses.css';

const RecentResponses = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="recent-responses">
      <h3>Recent Survey Responses</h3>
      <div className="table-responsive">
        <Table striped hover bordered>
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Respondent</th>
              <th>Age</th>
              <th>Education</th>
              <th>Knowledge Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((response, index) => (
              <tr key={index}>
                <td>{new Date(response.createdAt).toLocaleDateString()}</td>
                <td>Respondent #{response._id.slice(-4)}</td>
                <td>{response.demographics?.age || 'N/A'}</td>
                <td>{response.demographics?.education || 'N/A'}</td>
                <td>
                  <span className={`score-badge ${getScoreClass(response.nutritionKnowledge?.selfRating)}`}>
                    {response.nutritionKnowledge?.selfRating || 'N/A'}/10
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const getScoreClass = (score) => {
  if (typeof score !== 'number') return 'unknown';
  if (score >= 8) return 'high';
  if (score >= 5) return 'medium';
  return 'low';
};

export default RecentResponses;
