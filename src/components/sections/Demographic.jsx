import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Tooltip from '../common/Tooltips';

import '../../styles/Demographic.css'

const Demographic = ({ data, onNext, onPrev, isFirst }) => {
  const [formData, setFormData] = React.useState(data.demographics || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ demographics: formData });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="section-title">A. Socio-Demographic Data</h4>
      
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          How old are you? <Tooltip contentKey="age" />
        </Form.Label>
        <Col sm={8}>
          <Form.Select 
            name="age" 
            value={formData.age || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select age range</option>
            <option value="below20">Below 20</option>
            <option value="21-30">21-30</option>
            <option value="31-40">31-40</option>
            <option value="40+">40 and above</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Marital status
        </Form.Label>
        <Col sm={8}>
          <Form.Select 
            name="maritalStatus" 
            value={formData.maritalStatus || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select marital status</option>
            <option value="single">Single</option>
            <option value="married">Married/Living together</option>
            <option value="widowed">Widowed</option>
            <option value="divorced">Divorced/Separated</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Do you have any children?
        </Form.Label>
        <Col sm={8}>
          <div className="d-flex align-items-center">
            <Form.Check
              type="radio"
              id="childrenYes"
              label="Yes"
              name="hasChildren"
              value="yes"
              checked={formData.hasChildren === 'yes'}
              onChange={handleChange}
              className="me-3"
            />
            <Form.Check
              type="radio"
              id="childrenNo"
              label="No"
              name="hasChildren"
              value="no"
              checked={formData.hasChildren === 'no'}
              onChange={handleChange}
            />
          </div>
          {formData.hasChildren === 'yes' && (
            <Form.Control
              type="number"
              name="childrenCount"
              placeholder="Number of children"
              value={formData.childrenCount || ''}
              onChange={handleChange}
              className="mt-2"
              min="0"
              required
            />
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Education level
        </Form.Label>
        <Col sm={8}>
          <Form.Select 
            name="education" 
            value={formData.education || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select education level</option>
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="tertiary">Tertiary</option>
            <option value="higher">Higher</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Where do you live?
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            type="text"
            name="location"
            placeholder="Enter your location"
            value={formData.location || ''}
            onChange={handleChange}
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-4">
        <Form.Label column sm={4}>
          Religion
        </Form.Label>
        <Col sm={8}>
          <Form.Select 
            name="religion" 
            value={formData.religion || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select religion</option>
            <option value="christian">Christian</option>
            <option value="islam">Islam</option>
            <option value="traditional">Traditional</option>
            <option value="other">Other</option>
          </Form.Select>
          {formData.religion === 'other' && (
            <Form.Control
              type="text"
              name="religionOther"
              placeholder="Please specify"
              value={formData.religionOther || ''}
              onChange={handleChange}
              className="mt-2"
              required
            />
          )}
        </Col>
      </Form.Group>

      <div className="d-flex justify-content-between">
        {!isFirst && (
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onPrev}
          >
            Previous
          </button>
        )}
        <button 
          type="submit" 
          className="btn btn-primary ms-auto"
        >
          Continue
        </button>
      </div>
    </Form>
  );
};

export default Demographic;