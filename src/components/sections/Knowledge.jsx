import React from 'react';
import { Form, Row, Col, ListGroup } from 'react-bootstrap';
import Tooltip from '../common/Tooltips';
import { knowledgeContent } from '../../utilis/ResearchContent';
import '../../styles/Knowledge.css';

const Knowledge = ({ data, onNext, onPrev }) => {
  // Initialize with proper defaults and ensure arrays exist
  const [formData, setFormData] = React.useState({
    importantFoodGroups: [],
    knownNutrients: [],
    prenatalSupplements: [],
    receivedEducation: '',
    selfRating: '',
    fruitsVeggiesFrequency: '',
    wholeGrainsFrequency: '',
    proteinsFrequency: '',
    dairyFrequency: '',
    mealsPerDay: '',
    takesSupplements: '',
    physicalActivity: '',
    awareOfAvoidedFoods: '',
    avoidedFoodsList: '',
    awareOfRisks: '',
    ...(data.nutritionKnowledge || {})
  });

  // Ensure arrays exist in formData
  const safeFormData = {
    importantFoodGroups: formData.importantFoodGroups || [],
    knownNutrients: formData.knownNutrients || [],
    prenatalSupplements: formData.prenatalSupplements || [],
    ...formData
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const currentGroups = safeFormData.importantFoodGroups;
      if (checked) {
        setFormData({
          ...safeFormData,
          importantFoodGroups: [...currentGroups, value]
        });
      } else {
        setFormData({
          ...safeFormData,
          importantFoodGroups: currentGroups.filter(item => item !== value)
        });
      }
    } else {
      setFormData({ ...safeFormData, [name]: value });
    }
  };

  const handleNutrientAdd = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      e.preventDefault();
      setFormData({
        ...safeFormData,
        knownNutrients: [...safeFormData.knownNutrients, e.target.value]
      });
      e.target.value = '';
    }
  };

  const handleSupplementAdd = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      e.preventDefault();
      setFormData({
        ...safeFormData,
        prenatalSupplements: [...safeFormData.prenatalSupplements, e.target.value]
      });
      e.target.value = '';
    }
  };

  const removeItem = (arrayName, item) => {
    setFormData({
      ...safeFormData,
      [arrayName]: safeFormData[arrayName].filter(i => i !== item)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ nutritionKnowledge: safeFormData });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="section-title">D. Nutrition Knowledge</h4>
      
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Received nutrition education about pregnancy? <Tooltip contentKey="nutritionEducation" />
        </Form.Label>
        <Col sm={8} className="d-flex align-items-center">
          <Form.Check
            type="radio"
            id="educationYes"
            label="Yes"
            name="receivedEducation"
            value="yes"
            checked={safeFormData.receivedEducation === 'yes'}
            onChange={handleChange}
            className="me-3"
          />
          <Form.Check
            type="radio"
            id="educationNo"
            label="No"
            name="receivedEducation"
            value="no"
            checked={safeFormData.receivedEducation === 'no'}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Rate your nutrition knowledge importance during pregnancy <Tooltip contentKey="knowledgeRating" />
        </Form.Label>
        <Col sm={8}>
          <Form.Select 
            name="selfRating" 
            value={safeFormData.selfRating || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select rating</option>
            <option value="poor">Poor</option>
            <option value="fair">Fair</option>
            <option value="good">Good</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Important food groups for healthy pregnancy <Tooltip contentKey="importantFoodGroups" />
        </Form.Label>
        <Col sm={8}>
          <div className="mb-2">Select all that apply:</div>
          <Form.Check
            type="checkbox"
            id="foodGroupFruits"
            label="Fruits and vegetables"
            name="importantFoodGroups"
            value="fruitsVegetables"
            checked={safeFormData.importantFoodGroups.includes('fruitsVegetables')}
            onChange={handleChange}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            id="foodGroupGrains"
            label="Whole grains"
            name="importantFoodGroups"
            value="wholeGrains"
            checked={safeFormData.importantFoodGroups.includes('wholeGrains')}
            onChange={handleChange}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            id="foodGroupProteins"
            label="Lean proteins"
            name="importantFoodGroups"
            value="leanProteins"
            checked={safeFormData.importantFoodGroups.includes('leanProteins')}
            onChange={handleChange}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            id="foodGroupDairy"
            label="Dairy products"
            name="importantFoodGroups"
            value="dairyProducts"
            checked={safeFormData.importantFoodGroups.includes('dairyProducts')}
            onChange={handleChange}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            id="foodGroupFats"
            label="Fats and oils"
            name="importantFoodGroups"
            value="fatsOils"
            checked={safeFormData.importantFoodGroups.includes('fatsOils')}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Known essential nutrients for healthy pregnancy <Tooltip contentKey="knownNutrients" />
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            type="text"
            placeholder="Type a nutrient and press Enter"
            onKeyDown={handleNutrientAdd}
            className="mb-2"
          />
          {safeFormData.knownNutrients.length > 0 && (
            <ListGroup className="mb-3">
              {safeFormData.knownNutrients.map((nutrient, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                  {nutrient}
                  <button 
                    type="button" 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeItem('knownNutrients', nutrient)}
                  >
                    &times;
                  </button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Food consumption frequency during pregnancy <Tooltip contentKey="consumptionFrequency" />
        </Form.Label>
        <Col sm={8}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Food Group</th>
                <th>Rarely</th>
                <th>Occasionally</th>
                <th>Regularly</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fruits & Vegetables</td>
                {['rarely', 'occasionally', 'regularly'].map(freq => (
                  <td key={`fruits-${freq}`}>
                    <Form.Check
                      type="radio"
                      name="fruitsVeggiesFrequency"
                      value={freq}
                      checked={safeFormData.fruitsVeggiesFrequency === freq}
                      onChange={handleChange}
                      required
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td>Whole Grains</td>
                {['rarely', 'occasionally', 'regularly'].map(freq => (
                  <td key={`grains-${freq}`}>
                    <Form.Check
                      type="radio"
                      name="wholeGrainsFrequency"
                      value={freq}
                      checked={safeFormData.wholeGrainsFrequency === freq}
                      onChange={handleChange}
                      required
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td>Lean Proteins</td>
                {['rarely', 'occasionally', 'regularly'].map(freq => (
                  <td key={`proteins-${freq}`}>
                    <Form.Check
                      type="radio"
                      name="proteinsFrequency"
                      value={freq}
                      checked={safeFormData.proteinsFrequency === freq}
                      onChange={handleChange}
                      required
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td>Dairy Products</td>
                {['rarely', 'occasionally', 'regularly'].map(freq => (
                  <td key={`dairy-${freq}`}>
                    <Form.Check
                      type="radio"
                      name="dairyFrequency"
                      value={freq}
                      checked={safeFormData.dairyFrequency === freq}
                      onChange={handleChange}
                      required
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Meals per day <Tooltip contentKey="mealsPerDay" />
        </Form.Label>
        <Col sm={8}>
          <Form.Select 
            name="mealsPerDay" 
            value={safeFormData.mealsPerDay || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select number</option>
            <option value="2">Twice</option>
            <option value="3">Thrice</option>
            <option value="4">Four times</option>
            <option value="4+">More than four times</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Taking prenatal supplements? <Tooltip contentKey="prenatalSupplements" />
        </Form.Label>
        <Col sm={8} className="d-flex align-items-center">
          <Form.Check
            type="radio"
            id="supplementsYes"
            label="Yes"
            name="takesSupplements"
            value="yes"
            checked={safeFormData.takesSupplements === 'yes'}
            onChange={handleChange}
            className="me-3"
          />
          <Form.Check
            type="radio"
            id="supplementsNo"
            label="No"
            name="takesSupplements"
            value="no"
            checked={safeFormData.takesSupplements === 'no'}
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            id="supplementsUnsure"
            label="Not sure"
            name="takesSupplements"
            value="unsure"
            checked={safeFormData.takesSupplements === 'unsure'}
            onChange={handleChange}
            className="ms-3"
          />
        </Col>
      </Form.Group>

      {safeFormData.takesSupplements === 'yes' && (
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 8, offset: 4 }}>
            <Form.Control
              type="text"
              placeholder="Type a supplement and press Enter"
              onKeyDown={handleSupplementAdd}
              className="mb-2"
            />
            {safeFormData.prenatalSupplements.length > 0 && (
              <ListGroup className="mb-3">
                {safeFormData.prenatalSupplements.map((supplement, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    {supplement}
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeItem('prenatalSupplements', supplement)}
                    >
                      &times;
                    </button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        </Form.Group>
      )}

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Physical activity engagment during pregnancy <Tooltip contentKey="physicalActivity" />
        </Form.Label>
        <Col sm={8}>
          <Form.Select 
            name="physicalActivity" 
            value={safeFormData.physicalActivity || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select frequency</option>
            <option value="rarely">Rarely</option>
            <option value="never">Never</option>
            <option value="occasionally">Occasionally</option>
            <option value="regularly">Regularly</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4}>
          Aware of foods to avoid during pregnancy? <Tooltip contentKey="avoidedFoods" />
        </Form.Label>
        <Col sm={8} className="d-flex align-items-center">
          <Form.Check
            type="radio"
            id="avoidedYes"
            label="Yes"
            name="awareOfAvoidedFoods"
            value="yes"
            checked={safeFormData.awareOfAvoidedFoods === 'yes'}
            onChange={handleChange}
            className="me-3"
          />
          <Form.Check
            type="radio"
            id="avoidedNo"
            label="No"
            name="awareOfAvoidedFoods"
            value="no"
            checked={safeFormData.awareOfAvoidedFoods === 'no'}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      {safeFormData.awareOfAvoidedFoods === 'yes' && (
        <Form.Group as={Row} className="mb-4">
          <Col sm={{ span: 8, offset: 4 }}>
            <Form.Control
              as="textarea"
              name="avoidedFoodsList"
              placeholder="List foods to avoid during pregnancy"
              value={safeFormData.avoidedFoodsList || ''}
              onChange={handleChange}
              rows={3}
              required
            />
          </Col>
        </Form.Group>
      )}

      <Form.Group as={Row} className="mb-4">
        <Form.Label column sm={4}>
          Aware of potential risks of poor nutrition during pregnancy? <Tooltip contentKey="nutritionRisks" />
        </Form.Label>
        <Col sm={8} className="d-flex align-items-center">
          <Form.Check
            type="radio"
            id="risksYes"
            label="Yes"
            name="awareOfRisks"
            value="yes"
            checked={safeFormData.awareOfRisks === 'yes'}
            onChange={handleChange}
            className="me-3"
          />
          <Form.Check
            type="radio"
            id="risksNo"
            label="No"
            name="awareOfRisks"
            value="no"
            checked={safeFormData.awareOfRisks === 'no'}
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            id="risksUnsure"
            label="Not sure"
            name="awareOfRisks"
            value="unsure"
            checked={safeFormData.awareOfRisks === 'unsure'}
            onChange={handleChange}
            className="ms-3"
          />
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
          className="btn btn-success"
        >
          Submit Survey
        </button>
      </div>
    </Form>
  );
};

export default Knowledge; 