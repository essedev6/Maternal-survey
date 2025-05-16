import React, { useState } from 'react';
import { Container, Row, Col, Card, Tab, Tabs } from 'react-bootstrap';
import { 
  FaChartBar, 
  FaChartPie, 
  FaMapMarkedAlt, 
  FaRegLightbulb,
  FaArrowRight
} from 'react-icons/fa';
import '../styles/analyticsStyles/ResearchInsights.css';

const ResearchInsights = () => {
  const [activeTab, setActiveTab] = useState('demographics');

  // Sample data - replace with your actual research data
  const insightsData = {
    demographics: {
      title: "Demographic Patterns",
      icon: <FaChartBar className="insight-icon" />,
      findings: [
        "72% of respondents were aged 25-34",
        "65% reported urban residence",
        "58% had completed secondary education"
      ],
      chart: <div className="chart-placeholder bar-chart"></div>
    },
    nutrition: {
      title: "Nutrition Knowledge",
      icon: <FaRegLightbulb className="insight-icon" />,
      findings: [
        "Only 42% could identify key prenatal nutrients",
        "78% recognized importance of folic acid",
        "35% knew recommended calorie increase"
      ],
      chart: <div className="chart-placeholder pie-chart"></div>
    },
    regional: {
      title: "Regional Differences",
      icon: <FaMapMarkedAlt className="insight-icon" />,
      findings: [
        "Northern regions showed 20% lower nutrition scores",
        "Urban areas had better supplement awareness",
        "Coastal regions reported higher fish consumption"
      ],
      chart: <div className="chart-placeholder map-chart"></div>
    }
  };

  return (
    <Container fluid className="research-insights">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center section-title">
            <FaChartBar className="me-2" />
            Research Insights
          </h2>
          <p className="text-center lead">
            Key findings from our maternal nutrition survey
          </p>
        </Col>
      </Row>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4 insights-tabs"
        justify
      >
        {Object.keys(insightsData).map((key) => (
          <Tab 
            key={key}
            eventKey={key}
            title={
              <span>
                {insightsData[key].icon}
                {insightsData[key].title}
              </span>
            }
          />
        ))}
      </Tabs>

      <Row>
        <Col lg={6} className="findings-col">
          <Card className="findings-card h-100">
            <Card.Body>
              <Card.Title className="mb-4">
                <h4>{insightsData[activeTab].title} Findings</h4>
              </Card.Title>
              <ul className="findings-list">
                {insightsData[activeTab].findings.map((item, index) => (
                  <li key={index} className="finding-item">
                    <FaArrowRight className="me-2 arrow-icon" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="chart-col">
          <Card className="chart-card h-100">
            <Card.Body className="d-flex align-items-center justify-content-center">
              {insightsData[activeTab].chart}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="conclusion-card">
            <Card.Body>
              <h5 className="mb-3">Key Conclusion</h5>
              <p>
                Our research indicates significant gaps in prenatal nutrition 
                knowledge, particularly among younger mothers and rural populations. 
                Targeted education programs could improve maternal health outcomes.
              </p>
            
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResearchInsights;