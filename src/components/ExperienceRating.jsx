import React, { useState } from 'react';
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
import { FaStar, FaRegStar, FaSmile, FaFrown, FaMeh } from 'react-icons/fa';
import '../styles/ExperienceRating.css';

const ExperienceRating = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Container className="thank-you-container">
        <Card className="thank-you-card text-center p-4">
          <div className="celebration-emoji mb-3">🎉</div>
          <h2 className="text-success">Thank You!</h2>
          <p className="lead">We appreciate your feedback and time.</p>
          <p>Your response has been recorded successfully.</p>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="rating-container">
      <Card className="rating-card p-4">
        <div className="text-center mb-4">
          <h2>Congratulations!</h2>
          <p className="lead">You've completed the survey!</p>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4 text-center">
            <Form.Label className="d-block mb-3">
              <h5>How would you rate your experience?</h5>
            </Form.Label>
            <div className="stars-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={`star-btn ${star <= (hover || rating) ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(rating)}
                >
                  {star <= (hover || rating) ? (
                    <FaStar className="star-icon" />
                  ) : (
                    <FaRegStar className="star-icon" />
                  )}
                </button>
              ))}
            </div>
            <div className="rating-labels d-flex justify-content-between mt-2">
              <span>Poor</span>
              <span>Fair</span>
              <span>Good</span>
              <span>Very Good</span>
              <span>Excellent</span>
            </div>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Any suggestions for improvement?</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="What could we do better?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={rating === 0}
              className="submit-btn"
            >
              Submit Feedback
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default ExperienceRating;