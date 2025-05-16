import React, { useState } from 'react';
import { ProgressBar, Container } from 'react-bootstrap';
import { useSurvey } from '../context/SurveyContext';
import Demographic from '../components/sections/Demographic';
import Cultural from '../components/sections/Cultural';
import Economic from '../components/sections/Economic';
import Knowledge from '../components/sections/Knowledge';
import ThankYou from '../components/ThankYou';
import '../styles/Survey.css';

const Survey = () => {
  
    const [currentStep, setCurrentStep] = useState(1); // Initialize to 1
    const [complete, setComplete] = useState(false);

    const steps = [
        { title: 'Demographic', Component: Demographic },
        { title: 'Cultural', Component: Cultural },
        { title: 'Economic', Component: Economic },
        { title: 'Knowledge', Component: Knowledge }
    ];

const { surveyData, updateSurveyData } = useSurvey();

const handleNext = (sectionData) => {
  updateSurveyData(sectionData);  // Use the provided update function
  if(currentStep < steps.length) {
    setCurrentStep(currentStep + 1);
  } else {
    setComplete(true);
  }
};

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    const progressPercentage = (currentStep / steps.length) * 100;

    if (complete) {
        return <ThankYou />;
    }

    // Fix 1: Use the correct property name (Component instead of component)
    const CurrentStepComponent = steps[currentStep - 1].Component;

    return (
        <Container className="survey-container">
            <div className="survey-header">
                <h2>Maternal Nutrition Survey</h2>
                <ProgressBar 
                    now={progressPercentage}
                    label={`${Math.round(progressPercentage)}%`} // Fix 2: Fixed template literal and Math spelling
                    className="survey-progress"
                />
                <p className="step-indicator">
                    Section {currentStep} of {steps.length}: {steps[currentStep - 1].title}
                </p>
            </div>
            <div className="survey-body">
                {/* Fix 3: Use proper JSX casing for component */}
                <CurrentStepComponent 
                    data={surveyData}
                    onNext={handleNext}
                    onPrev={handlePrev} // Fix 4: Fixed typo (onPev -> onPrev)
                    isFirst={currentStep === 1}
                    isLast={currentStep === steps.length} 
                />
            </div>
        </Container>
    );
};

export default Survey;