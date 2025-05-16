import React, { createContext, useContext, useState } from 'react';
import '../styles/SurveyContext.css';

const SurveyContext = createContext();

export function SurveyProvider({ children }) {
  const [surveyData, setSurveyData] = useState({
    demographics: {},
    culturalFactors: {},
    economicFactors: {},
    nutritionKnowledge: {}
  });

  const clearSurvey = () => {
    setSurveyData({
      demographics: {},
      culturalFactors: {},
      economicFactors: {},
      nutritionKnowledge: {}
    });
  };

  const updateSurveyData = (newData) => {
    setSurveyData(prev => ({ ...prev, ...newData }));
  };

  const value = {
    surveyData,
    updateSurveyData,
    clearSurvey
  };

  return (
    <SurveyContext.Provider value={value}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  return useContext(SurveyContext);
}