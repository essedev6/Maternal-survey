import { Table } from 'react-bootstrap';
import '../../styles/analyticsStyles/CrossTabAnalysis.css';

const CrossTabAnalysis = ({ data, variables }) => {
  if (!data || !variables) return null;

  return (
    <div className="cross-tab-container">
      <h4>Cross Tabulation: {variables.join(' vs ')}</h4>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>{variables[0]} \ {variables[1]}</th>
              {data.columns.map(col => (
                <th key={col}>{col}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={i}>
                <td><strong>{row.name}</strong></td>
                {row.values.map((val, j) => (
                  <td key={j}>{val}</td>
                ))}
                <td><strong>{row.total}</strong></td>
              </tr>
            ))}
            <tr className="total-row">
              <td><strong>Total</strong></td>
              {data.totals.map((total, i) => (
                <td key={i}><strong>{total}</strong></td>
              ))}
              <td><strong>{data.grandTotal}</strong></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CrossTabAnalysis;