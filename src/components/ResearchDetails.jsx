import React from 'react';
import { Container, Row, Col, Accordion, Card, Tab, Tabs } from 'react-bootstrap';
import '../styles/analyticsStyles/ResearchDetails.css';

const ResearchDetails = () => {
  return (
    <Container className="research-details py-5">
      <Row className="mb-5">
        <Col>
          <h1 className="text-center research-title">
            Factors Influencing Dietary Patterns Among Women Attending Antenatal Visits
          </h1>
          <p className="text-center lead research-subtitle">
            A Research Study Conducted at Kapsabet County Referral Hospital
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6}>
          <div className="research-highlight-card">
            <h3>Research Overview</h3>
            <p>
              This study examines how cultural beliefs, socioeconomic status, and nutritional knowledge 
              affect the dietary patterns of pregnant women attending antenatal care at Kapsabet County 
              Referral Hospital in Kenya.
            </p>
            <div className="key-facts">
              <h5>Key Facts:</h5>
              <ul>
                <li>Target Population: 75 pregnant women</li>
                <li>Location: Kapsabet County, Kenya</li>
                <li>Duration: May 2025</li>
                <li>Research Method: Cross-sectional descriptive study</li>
              </ul>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="research-image-container">
            <img 
              src="/images/maternal-health.jpg" 
              alt="Pregnant women at antenatal clinic"
              className="img-fluid rounded"
            />
            <div className="image-caption">
              Maternal nutrition is crucial for healthy pregnancy outcomes
            </div>
          </div>
        </Col>
      </Row>

      <Tabs defaultActiveKey="background" className="mb-4 research-tabs">
        <Tab eventKey="background" title="Background">
          <div className="tab-content p-4">
            <h3>Background Information</h3>
            <p>
              Maternal nutrition during pregnancy is essential for both mothers and babies. 
              Globally, 1 in 3 women of reproductive age are anemic, with a 36.5% prevalence 
              among pregnant women (WHO, 2019). In Kenya, malnutrition remains a major public 
              health issue, with 11% of reproductive-age women underweight and 26% anemic (KDHS 2014).
            </p>
            
            <h4 className="mt-4">Problem Statement</h4>
            <p>
              Despite available antenatal services, many pregnant women in Kenya continue to experience 
              poor nutritional practices, leading to adverse outcomes like low birth weight (12.4% prevalence) 
              and maternal morbidity (45% of maternal deaths attributed to poor nutrition).
            </p>
          </div>
        </Tab>

        <Tab eventKey="objectives" title="Objectives">
          <div className="tab-content p-4">
            <h3>Research Objectives</h3>
            <h4>Broad Objective:</h4>
            <p>
              To determine the level of nutritional knowledge and highlight socioeconomic and cultural 
              factors influencing dietary patterns among women attending antenatal visits in Kapsabet County 
              Referral Hospital.
            </p>
            
            <h4 className="mt-4">Specific Objectives:</h4>
            <ol>
              <li>Determine socioeconomic factors influencing dietary patterns</li>
              <li>Identify cultural factors affecting food choices</li>
              <li>Assess the level of nutritional knowledge among pregnant women</li>
            </ol>
          </div>
        </Tab>

        <Tab eventKey="methodology" title="Methodology">
          <div className="tab-content p-4">
            <h3>Research Methodology</h3>
            <div className="methodology-details">
              <h4>Study Design:</h4>
              <p>Descriptive cross-sectional study using systematic random sampling</p>
              
              <h4>Sample Size:</h4>
              <p>63 pregnant women (calculated using Fisher's formula)</p>
              
              <h4>Data Collection:</h4>
              <p>Structured questionnaires with both open and closed-ended questions</p>
              
              <h4>Data Analysis:</h4>
              <p>SPSS software with results presented in tables, graphs and pie charts</p>
            </div>
          </div>
        </Tab>
      </Tabs>

      <Row className="mb-5">
        <Col>
          <div className="key-findings">
            <h3 className="text-center mb-4">Expected Key Findings</h3>
            <Row>
              <Col md={4}>
                <div className="finding-card">
                  <h5>Cultural Factors</h5>
                  <ul>
                    <li>Food taboos and restrictions</li>
                    <li>Influence of traditional birth attendants</li>
                    <li>Cultural beliefs about pregnancy nutrition</li>
                  </ul>
                </div>
              </Col>
              <Col md={4}>
                <div className="finding-card">
                  <h5>Socioeconomic Factors</h5>
                  <ul>
                    <li>Income levels and food accessibility</li>
                    <li>Education's impact on nutrition knowledge</li>
                    <li>Occupation and time for meal preparation</li>
                  </ul>
                </div>
              </Col>
              <Col md={4}>
                <div className="finding-card">
                  <h5>Nutrition Knowledge</h5>
                  <ul>
                    <li>Awareness of essential nutrients</li>
                    <li>Understanding of balanced diets</li>
                    <li>Knowledge gaps among participants</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Accordion className="research-faq">
            <h3 className="text-center mb-4">Frequently Asked Questions</h3>
            
            <Accordion.Item eventKey="0">
              <Accordion.Header>Why is this research important?</Accordion.Header>
              <Accordion.Body>
                This study addresses critical gaps in understanding maternal nutrition practices in rural Kenya. 
                The findings will help develop targeted interventions to improve pregnancy outcomes and reduce 
                maternal/infant mortality rates in Kapsabet County.
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="1">
              <Accordion.Header>How were participants selected?</Accordion.Header>
              <Accordion.Body>
                Participants were systematically selected from pregnant women attending antenatal visits at 
                Kapsabet County Referral Hospital. Every consenting woman meeting the inclusion criteria was 
                invited to participate until the sample size of 63 was reached.
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="2">
              <Accordion.Header>What are the expected outcomes?</Accordion.Header>
              <Accordion.Body>
                The research will identify key cultural, economic and knowledge factors affecting maternal 
                nutrition. These insights will inform healthcare policies and community education programs 
                to improve nutritional practices during pregnancy.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col className="text-center">
          <div className="cta-section">
            <h4>Interested in the Full Research?</h4>
            <p>Download the complete research proposal for detailed methodology and references</p>
            <button className="btn btn-primary btn-lg download-btn">
              Download Full Research (PDF)
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResearchDetails;