import React, { useState } from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import ExperienceRating from '../components/ExperienceRating';
import { useSurvey } from '../context/SurveyContext';
import { submitSurvey } from '../services/survey';
import '../styles/ThankYou.css';

const ThankYou = () => {
  const { surveyData, clearSurvey } = useSurvey();
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingSubmit = async (rating) => {
    try {
      setIsSubmitting(true);
      const completeData = { ...surveyData, experienceRating: rating };

      // ✅ Log the full data payload before submitting
      console.log("Complete surveyData being submitted:", completeData);

      await submitSurvey(completeData);
      setRatingSubmitted(true);
      clearSurvey();
    } catch (err) {
      setError('Failed to submit your rating. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="thank-you-container">
      <Row className="justify-content-center">
        <Col md={8} className="thank-you-card">
          <h1 className="text-center mb-4">Thank You for Your Participation!</h1>
          
          <div className="thank-you-content">
            <p className="lead text-center">
              Your responses have been recorded and will contribute valuable 
              insights to our research on maternal nutrition in Kapsabet County.
            </p>

            {!ratingSubmitted ? (
              <div className="rating-section">
                <h3 className="text-center mb-4">How was your survey experience?</h3>
                <ExperienceRating 
                  onSubmit={handleRatingSubmit} 
                  disabled={isSubmitting} 
                />
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
              </div>
            ) : (
              <Alert variant="success" className="text-center">
                Thank you for your feedback! You may now close this page.
              </Alert>
            )}

            <div className="research-impact mt-5">
              <h4 className="text-center mb-3">About This Research</h4>
              <p>
                This study aims to determine the level of nutritional knowledge and 
                identify socio-economic and cultural factors influencing dietary 
                patterns among women attending antenatal visits at Kapsabet County 
                Referral Hospital. Your participation helps us understand these 
                factors better and develop targeted interventions.
              </p>
              <div className="text-center mt-4">
                <a href="/research-about" className="btn btn-outline-primary">
                  Learn More About the Study
                </a>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ThankYou;
