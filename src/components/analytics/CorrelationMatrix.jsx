import { Table } from 'react-bootstrap';
import '../../styles/analyticsStyles/CorrelationMatrix.css';

const CorrelationMatrix = ({ data }) => {
  if (!data) return null;

  return (
    <div className="correlation-matrix">
      <h4>Variable Correlations</h4>
      <div className="table-responsive">
        <Table bordered>
          <thead>
            <tr>
              <th>Variables</th>
              {data.variables.map(varName => (
                <th key={varName}>{varName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.matrix.map((row, i) => (
              <tr key={i}>
                <td><strong>{data.variables[i]}</strong></td>
                {row.map((value, j) => (
                  <td 
                    key={j}
                    className={getCorrelationClass(value)}
                  >
                    {value.toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const getCorrelationClass = (value) => {
  const absValue = Math.abs(value);
  if (absValue > 0.7) return 'strong-correlation';
  if (absValue > 0.3) return 'moderate-correlation';
  return 'weak-correlation';
};

export default CorrelationMatrix;