import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Tooltip from '../common/Tooltips';
import '../../styles/Cultural.css';

const Cultural = ({ data, onNext, onPrev }) => {
  const [formData, setFormData] = React.useState(data.culturalFactors || {});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ culturalFactors: formData });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="section-title">B. Cultural Factors</h4>
      
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Do you think traditional food during pregnancy is of importance <Tooltip contentKey="culturalFoodImportance" />
        </Form.Label>
        <Col sm={8}>
          <Form.Select 
            name="culturalFoodImportance" 
            value={formData.culturalFoodImportance || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select importance level</option>
            <option value="very">Very important</option>
            <option value="somewhat">Somewhat important</option>
            <option value="not">Not important</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Are you aware of any beneficial cultural practises? <Tooltip contentKey="beneficialPractices" />
        </Form.Label>
        <Col sm={8} className="d-flex align-items-center">
          <Form.Check
            type="radio"
            id="beneficialYes"
            label="Yes"
            name="beneficialPractices"
            value="yes"
            checked={formData.beneficialPractices === 'yes'}
            onChange={handleChange}
            className="me-3"
          />
          <Form.Check
            type="radio"
            id="beneficialNo"
            label="No"
            name="beneficialPractices"
            value="no"
            checked={formData.beneficialPractices === 'no'}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Do you know any food restrictions/taboos during pregnancy? <Tooltip contentKey="restrictions" />
        </Form.Label>
        <Col sm={8} className="d-flex align-items-center">
          <Form.Check
            type="radio"
            id="restrictionsYes"
            label="Yes"
            name="hasRestrictions"
            value="yes"
            checked={formData.hasRestrictions === 'yes'}
            onChange={handleChange}
            
            className="me-3"
          />
          <Form.Check
            type="radio"
            id="restrictionsNo"
            label="No"
            name="hasRestrictions"
            value="no"
            checked={formData.hasRestrictions === 'no'}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      {formData.hasRestrictions === 'yes' && (
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 8, offset: 4 }}>
            <Form.Control
              as="textarea"
              name="restrictionsDetails"
              placeholder="Please describe the restrictions/taboos"
              value={formData.restrictionsDetails || ''}
              onChange={handleChange}
              rows={3}
              required
            />
          </Col>
        </Form.Group>
      )}

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Does influence of family/TBAs have an impact during pregnancy? <Tooltip contentKey="familyInfluence" />
        </Form.Label>
        <Col sm={8}>
          <Form.Select 
            name="familyInfluence" 
            value={formData.familyInfluence || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select influence level</option>
            <option value="high">Highly influential</option>
            <option value="moderate">Moderately influential</option>
            <option value="low">Minimal influence</option>
            <option value="none">No influence</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-4">
        <Form.Label column sm={4}>
          Do you have belief in cultural rituals/practises during pregnancy? <Tooltip contentKey="rituals" />
        </Form.Label>
        <Col sm={8} className="d-flex align-items-center">
          <Form.Check
            type="radio"
            id="ritualsYes"
            label="Yes"
            name="followsRituals"
            value="yes"
            checked={formData.followsRituals === 'yes'}
            onChange={handleChange}
            className="me-3"
          />
          <Form.Check
            type="radio"
            id="ritualsNo"
            label="No"
            name="followsRituals"
            value="no"
            checked={formData.followsRituals === 'no'}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      {formData.followsRituals === 'yes' && (
        <Form.Group as={Row} className="mb-4">
          <Col sm={{ span: 8, offset: 4 }}>
            <Form.Control
              as="textarea"
              name="ritualsDescription"
              placeholder="Please describe the rituals/practices"
              value={formData.ritualsDescription || ''}
              onChange={handleChange}
              rows={3}
              required
            />
          </Col>
        </Form.Group>
      )}

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

export default Cultural;