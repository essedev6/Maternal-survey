import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import marchPoster from '../assets/images/pregnant.jpg';
import '../styles/Home.css';

const Home  = () => {
    return(
        <Container className="home-page">
            <Row className="align-items-center">
                <Col md={6}>
                <h1> Maternal Nutrition Research Survey</h1>
                <p className="Lead"> Participate in our study examining dietary patterns among pregnant women affecting antenatal visits in Kapsabet County</p>
                <div className="cta-buttons">
                    <Button as={Link} to="/survey" variant="primary" size="lg"> Start Survey</Button>
                    <Button as={Link} to="/research-about" variant="outline-secondary" size="lg"> Learn More</Button>
                </div>
                </Col>
                <Col md={6}>
                <img src={marchPoster}
                alt="Pregnant women"
                className="img"/>
                 </Col>
            </Row>
            <section className="research-highlights mt-5">
                <h2> Research Highlights</h2>
                <Row>
                       <Col md={4}>
                    <div className="highlight-card">
                        <h3>Cultural Impacts</h3>
                        <p> We investigate the relationship between Food taboos and restrictions, Influence of traditional birth attendants and Cultural beliefs about pregnancy nutrition.</p>

                    </div>
                    </Col>
                    <Col md={4}>
                    <div className="highlight-card">
                        <h3>Economic Impact</h3>
                        <p> We investigate the relationship between socio-economic status and nutritional patterns during pregnancy.</p>

                    </div>
                    </Col>
                    <Col md={4}>
                    <div className="highlight-card">
                    <h3>Knowledge Assessment</h3>
                    <p> The survey evaluates nutritional knowledge levels among pregnant women attending antenatal care</p>
                    </div>
                    </Col>
                </Row>
            </section>
        </Container>
    );
};
export default Home;
