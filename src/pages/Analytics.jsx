import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap'; 

import { Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/useAuth';
import { getAdvancedAnalytics } from '../services/analytics';
import CrossTabAnalysis from '../components/analytics/CrossTabAnalysis';
import CorrelationMatrix from '../components/analytics/CorrelationMatrix';
import TimeSeriesChart from '../components/analytics/TimeSeriesChart';
import '../styles/Analytics.css';

const Analytics = () => {
  const { currentUser } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    demographic: 'all',
    responseType: 'all'
  });

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await getAdvancedAnalytics(filters);
        setAnalytics(data);
      } catch (err) {
        setError('Failed to load analytics data');
        console.log('Encounterd error:',err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      loadAnalytics();
    }
  }, [currentUser, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <Container className="analytics-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="analytics-error">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="analytics-container">
      <h1>Advanced Analytics</h1>
      
      <Row className="filter-row mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Date Range</Form.Label>
            <Form.Select
              name="dateRange"
              value={filters.dateRange}
              onChange={handleFilterChange}
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Demographic Group</Form.Label>
            <Form.Select
              name="demographic"
              value={filters.demographic}
              onChange={handleFilterChange}
            >
              <option value="all">All Groups</option>
              <option value="age_20">Below 20</option>
              <option value="age_21_30">21-30 Years</option>
              <option value="age_31_40">31-40 Years</option>
              <option value="age_40">40+ Years</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Response Type</Form.Label>
            <Form.Select
              name="responseType"
              value={filters.responseType}
              onChange={handleFilterChange}
            >
              <option value="all">All Responses</option>
              <option value="complete">Completed Only</option>
              <option value="partial">Partial Only</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <TimeSeriesChart data={analytics.timeSeries} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <CrossTabAnalysis 
            data={analytics.crossTab} 
            variables={['culturalFoodImportance', 'nutritionKnowledge']}
          />
        </Col>
        <Col md={6}>
          <CorrelationMatrix data={analytics.correlations} />
        </Col>
      </Row>

      <Row>
        <Col>
          <h3>Key Insights</h3>
          <ul className="insights-list">
            {analytics.insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Analytics;