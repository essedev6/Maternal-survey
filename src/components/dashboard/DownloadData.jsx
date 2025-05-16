import React, { useEffect, useState } from 'react';
import { Button, Table, Spinner, Alert } from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import api from '../../services/api';

const DownloadData = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResponses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const res = await api.get('/v1/surveys', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResponses(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to load responses.');
    } finally {
      setLoading(false);
    }
  };

  // Single declaration of formatArray
  const formatArray = (array) => {
    if (!array || array.length === 0) return 'N/A';
    return array.join(', ');
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;
    const lineHeight = 15;
    let yPos = 40;

    // Add title and header
    const addHeader = () => {
      doc.setFontSize(16);
      doc.setTextColor(52, 152, 219);
      doc.text('Maternal Survey Full Report', pageWidth / 2, yPos, { align: 'center' });
      yPos += lineHeight * 2;
      doc.setDrawColor(52, 152, 219);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += lineHeight;
    };

    // Add section title
    const addSection = (title) => {
      if (yPos > doc.internal.pageSize.getHeight() - 100) {
        doc.addPage();
        yPos = 40;
        addHeader();
      }
      
      doc.setFontSize(12);
      doc.setTextColor(52, 152, 219);
      doc.text(title, margin, yPos);
      yPos += lineHeight;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
    };

    // Format data for display
    const formatValue = (value) => {
      if (value === null || value === undefined || value === '') return 'N/A';
      if (Array.isArray(value)) return formatArray(value);
      return value.toString();
    };

    // Process each response
    responses.forEach((resp, index) => {
      if (index > 0) {
        doc.addPage();
        yPos = 40;
      }
      
      addHeader();
      
      const d = resp.demographics || {};
      const c = resp.culturalFactors || {};
      const e = resp.economicFactors || {};
      const n = resp.nutritionKnowledge || {};
      const r = resp.experienceRating || {};

      // Section 1: Demographics
      addSection(`Respondent ${index + 1} - Demographic Information`);
      const demoData = [
        ['Age:', d.age],
        ['Marital Status:', d.maritalStatus],
        ['Number of Children:', d.childrenCount],
        ['Education Level:', d.education],
        ['Location:', d.location],
        ['Religion:', d.religion]
      ];
      
      demoData.forEach(([label, value]) => {
        doc.text(`${label}`, margin, yPos);
        doc.text(`${formatValue(value)}`, margin + 120, yPos);
        yPos += lineHeight;
      });
      yPos += lineHeight;

      // Section 2: Cultural Factors
      addSection('Cultural Factors');
      const culturalData = [
        ['Cultural Food Importance:', c.culturalFoodImportance],
        ['Beneficial Practices:', c.beneficialPractices],
        ['Has Dietary Restrictions:', c.hasRestrictions],
        ['Family Influence:', c.familyInfluence],
        ['Follows Food Rituals:', c.followsRituals]
      ];
      
      culturalData.forEach(([label, value]) => {
        doc.text(`${label}`, margin, yPos);
        doc.text(`${formatValue(value)}`, margin + 150, yPos);
        yPos += lineHeight;
      });
      yPos += lineHeight;

      // Section 3: Economic Factors
      addSection('Economic Factors');
      const economicData = [
        ['Employment Status:', e.employmentStatus],
        ['Work Type:', e.workType],
        ['Work Hours:', e.workHours],
        ['Income Range:', e.income],
        ['Number of Dependents:', e.dependents],
        ['Residence Type:', e.residenceType],
        ['Weekly Food Expenditure:', e.foodExpenditure]
      ];
      
      economicData.forEach(([label, value]) => {
        doc.text(`${label}`, margin, yPos);
        doc.text(`${formatValue(value)}`, margin + 150, yPos);
        yPos += lineHeight;
      });
      yPos += lineHeight;

      // Section 4: Nutrition Knowledge
      addSection('Nutrition Knowledge');
      const nutritionData = [
        ['Received Nutrition Education:', n.receivedEducation],
        ['Self-Rating:', n.selfRating],
        ['Important Food Groups:', n.importantFoodGroups],
        ['Known Nutrients:', n.knownNutrients],
        ['Fruits/Veggies Frequency:', n.fruitsVeggiesFrequency],
        ['Whole Grains Frequency:', n.wholeGrainsFrequency],
        ['Proteins Frequency:', n.proteinsFrequency],
        ['Dairy Frequency:', n.dairyFrequency],
        ['Meals Per Day:', n.mealsPerDay],
        ['Takes Supplements:', n.takesSupplements],
        ['Prenatal Supplements:', n.prenatalSupplements],
        ['Physical Activity:', n.physicalActivity],
        ['Avoids Certain Foods:', n.awareOfAvoidedFoods],
        ['Avoided Foods List:', n.avoidedFoodsList]
      ];
      
      nutritionData.forEach(([label, value]) => {
        // Handle multi-line text for longer values
        const lines = doc.splitTextToSize(`${formatValue(value)}`, pageWidth - margin - 150);
        doc.text(`${label}`, margin, yPos);
        doc.text(lines, margin + 150, yPos);
        yPos += (lines.length * lineHeight);
      });
      yPos += lineHeight;

      // Section 5: Experience Rating
      addSection('Experience Rating');
      doc.text(`Rating: ${r.rating ?? 'N/A'}`, margin, yPos);
      yPos += lineHeight;
       doc.text(`FinalComment: ${r.comment ?? 'N/A'}`, margin, yPos);
      yPos += lineHeight;
      doc.text(`Submitted: ${new Date(resp.createdAt).toLocaleString()}`, margin, yPos);
      yPos += lineHeight * 2;
    });

    doc.save('maternal-survey-report-booklet.pdf');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this response?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await api.delete(`/v1/surveys/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResponses((prev) => prev.filter((resp) => resp._id !== id));
    } catch (err) {
      alert('Failed to delete response.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="download-data p-4">
      <h4 className="mb-3">Manage & Download Survey Data</h4>

      <Button variant="success" onClick={handleDownloadPDF} className="mb-3">
        📥 Download Full Data as PDF
      </Button>

      {responses.length === 0 ? (
        <p>No survey responses found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Age</th>
              <th>Marital</th>
              <th>Children</th>
              <th>Education</th>
              <th>Employment</th>
              <th>Meals/Day</th>
              <th>Rating</th>
              <th>Submitted At</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((resp, index) => (
              <tr key={resp._id}>
                <td>{index + 1}</td>
                <td>{resp.demographics?.age || 'N/A'}</td>
                <td>{resp.demographics?.maritalStatus || 'N/A'}</td>
                <td>{resp.demographics?.childrenCount || 'N/A'}</td>
                <td>{resp.demographics?.education || 'N/A'}</td>
                <td>{resp.economicFactors?.employmentStatus || 'N/A'}</td>
                <td>{resp.nutritionKnowledge?.mealsPerDay || 'N/A'}</td>
                <td>{resp.experienceRating?.rating || 'N/A'}</td>
                <td>{new Date(resp.createdAt).toLocaleString()}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(resp._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default DownloadData;





