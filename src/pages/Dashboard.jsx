import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Tab, Tabs, Alert } from 'react-bootstrap';
import IncomeDistributionChart from '../components/dashboard/IncomeDistribtuionChart';
import EmploymentChart from '../components/dashboard/EmploymentChart';
import { useAuth } from '../context/useAuth';
import { getSurveyAnalytics } from '../services/survey';
import StatCard from '../components/common/StatCard';
import ResponseChart from '../components/dashboard/ResponseChart';
import DemographicChart from '../components/dashboard/DemographicChart';
import CulturalAnalysis from '../components/dashboard/CulturalAnalysis';
import RecentResponses from '../components/dashboard/RecentResponses';
import DownloadData from '../components/dashboard/DownloadData';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('adminToken');
       
        if (!token) {
          setError('You are not authorized. Please log in.');
          setLoading(false);
          return;
        }

        const response = await getSurveyAnalytics();
       
      

        if (response.success) {
          setAnalytics(response.data);
        } else {
          setError('Failed to fetch analytics data.');
        }
      } catch (err) {
        console.error('Encountered error:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      loadAnalytics();
    }
  }, [currentUser]);

  if (loading) {
    return (
      <Container className="dashboard-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="dashboard-error">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <Container className="dashboard-container">
      <Row className="dashboard-header">
        <Col>
          <h1>Survey Analytics Dashboard</h1>
          <p className="text-muted">
           
          </p>
            <StatCard
                title="Last Updated"
                value={analytics.LastUpdated[1]}
                icon="📊"
               
              />
        </Col>
      </Row>

      <Tabs  activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3 tab-card">
        <Tab eventKey="overview" title="Overview">
          <Row className="stats-row">
            <Col md={3}>
              <StatCard
                title="Total Responses"
                value={analytics.totalResponses}
                icon="📊"
                trend={analytics.responseTrend}
              />
            </Col>
            <Col md={3}>
              <StatCard
                title="Completion Rate"
                value={`${analytics.completionRate}%`}
                icon="✅"
              />
            </Col>
            <Col md={3}>
              <StatCard
                title="Avg. Rating"
                value={analytics.averageExperienceRating}
                icon="⭐"
              />
            </Col>
            <Col md={3}>
              <StatCard
                title="Avg. Time"
                value={`${analytics.averageTime} min`}
                icon="⏱️"
              />
            </Col>
          </Row>

          <Row className="chart-row">
            <Col md={8}>
              <ResponseChart data={analytics.responseTrends} />
            </Col>
            <Col md={4}>
              <DemographicChart data={analytics.culturalFactors} />
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="cultural" title="Cultural Factors">
          <Row className='chart-cultural'>
          <CulturalAnalysis data={analytics.culturalFactors} />
          </Row>
        </Tab>

        <Tab eventKey="economic" title="Economic Factors">
          <Row className='chart-economic'>
            <Col md={6}>
              <IncomeDistributionChart data={analytics.incomeDistribution} />
            </Col>
            <Col md={6}>
              <EmploymentChart data={analytics.employmentStatus} />
            </Col>
          </Row>
        </Tab>

        <Tab  eventKey="responses" title="Recent Responses">
           <Row className='chart-responses'>
          <RecentResponses data={analytics.recentResponses} />
          <DownloadData />
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Dashboard;

