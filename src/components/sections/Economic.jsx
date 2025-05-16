import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Tooltip from '../common/Tooltips';
import { economicFactorsContent } from '../../utilis/ResearchContent';
import '../../styles/Economic.css';

const Economic = ({ data, onNext, onPrev }) => {
  const [formData, setFormData] = React.useState(data.economicFactors || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ economicFactors: formData });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="section-title">C. Economic Factors</h4>
      
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Employment status <Tooltip contentKey="employmentStatus" />
        </Form.Label>
        <Col sm={8}>
          <Form.Select 
            name="employmentStatus" 
            value={formData.employmentStatus || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select employment status</option>
            <option value="employed">Employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="self-employed">Self-employed</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Type of work <Tooltip contentKey="workType" />
        </Form.Label>
        <Col sm={8}>
          <Form.Select 
            name="workType" 
            value={formData.workType || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select work type</option>
            <option value="office">Office work</option>
            <option value="manual">Manual work</option>
            <option value="home">Working from home</option>
            <option value="other">Other</option>
          </Form.Select>
          {formData.workType === 'other' && (
            <Form.Control
              type="text"
              name="workTypeOther"
              placeholder="Please specify"
              value={formData.workTypeOther || ''}
              onChange={handleChange}
              className="mt-2"
              required
            />
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Daily work hours <Tooltip contentKey="workHours" />
        </Form.Label>
        <Col sm={8}>
          <Form.Select 
            name="workHours" 
            value={formData.workHours || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select hours</option>
            <option value="1-6">1-6 hours</option>
            <option value="7-12">7-12 hours</option>
            <option value="12+">More than 12 hours</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Monthly income (KES) <Tooltip contentKey="income" />
        </Form.Label>
        <Col sm={8}>
          <Form.Select 
            name="income" 
            value={formData.income || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select income range</option>
            <option value="0-5000">0-5,000</option>
            <option value="5000-10000">5,000-10,000</option>
            <option value="10000-30000">10,000-30,000</option>
            <option value="30000-50000">30,000-50,000</option>
            <option value="50000+">Above 50,000</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Dependents <Tooltip contentKey="dependents" />
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            type="number"
            name="dependents"
            placeholder="Number of dependents"
            value={formData.dependents || ''}
            onChange={handleChange}
            min="0"
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Residence type <Tooltip contentKey="residenceType" />
        </Form.Label>
        <Col sm={8}>
          <Form.Select 
            name="residenceType" 
            value={formData.residenceType || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select residence type</option>
            <option value="rental">Rental</option>
            <option value="owned">Owned</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-4">
        <Form.Label column sm={4}>
          Food expenditure (%) <Tooltip contentKey="foodExpenditure" />
        </Form.Label>
        <Col sm={8}>
          <Form.Select 
            name="foodExpenditure" 
            value={formData.foodExpenditure || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select percentage</option>
            <option value="10-20">10-20%</option>
            <option value="20-40">20-40%</option>
            <option value="40+">Above 40%</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <div className="d-flex justify-content-between">
        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={onPrev}
        >
          Previous
        </button>
        <button 
          type="submit" 
          className="btn btn-primary"
        >
          Continue
        </button>
      </div>
    </Form>
  );
};

export default Economic;