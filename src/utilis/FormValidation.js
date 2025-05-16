/**
 * Validates survey form data with comprehensive checks
 */
export const validateSurveyForm = (formData, currentSection) => {
    const errors = {};
  
    // Section A: Demographic Validation
    if (currentSection === 'demographics' || !currentSection) {
      if (!formData.age) errors.age = 'Age range is required';
      if (!formData.maritalStatus) errors.maritalStatus = 'Marital status is required';
      if (formData.hasChildren === undefined) errors.hasChildren = 'Please specify if you have children';
      if (formData.hasChildren === 'yes' && !formData.childrenCount) {
        errors.childrenCount = 'Please specify number of children';
      }
      if (!formData.education) errors.education = 'Education level is required';
      if (!formData.location) errors.location = 'Location is required';
      if (!formData.religion) errors.religion = 'Religion is required';
      if (formData.religion === 'other' && !formData.religionOther) {
        errors.religionOther = 'Please specify your religion';
      }
    }
  
    // Section B: Cultural Factors Validation
    if (currentSection === 'culturalFactors' || !currentSection) {
      if (!formData.culturalFoodImportance) {
        errors.culturalFoodImportance = 'Please rate importance of cultural food';
      }
      if (formData.beneficialPractices === undefined) {
        errors.beneficialPractices = 'Please specify if cultural practices are beneficial';
      }
      if (formData.hasRestrictions === undefined) {
        errors.hasRestrictions = 'Please specify if there are food restrictions';
      }
      if (formData.hasRestrictions === 'yes' && !formData.restrictionsDetails) {
        errors.restrictionsDetails = 'Please describe the restrictions';
      }
      if (!formData.familyInfluence) {
        errors.familyInfluence = 'Please specify influence level';
      }
      if (formData.followsRituals === undefined) {
        errors.followsRituals = 'Please specify if you follow rituals';
      }
      if (formData.followsRituals === 'yes' && !formData.ritualsDescription) {
        errors.ritualsDescription = 'Please describe the rituals';
      }
    }
  
    // Section C: Economic Factors Validation
    if (currentSection === 'economicFactors' || !currentSection) {
      if (!formData.employmentStatus) errors.employmentStatus = 'Employment status is required';
      if (!formData.workType) errors.workType = 'Work type is required';
      if (formData.workType === 'other' && !formData.workTypeOther) {
        errors.workTypeOther = 'Please specify work type';
      }
      if (!formData.workHours) errors.workHours = 'Work hours are required';
      if (!formData.income) errors.income = 'Income range is required';
      if (!formData.dependents && formData.dependents !== 0) {
        errors.dependents = 'Please specify number of dependents';
      }
      if (!formData.residenceType) errors.residenceType = 'Residence type is required';
      if (!formData.foodExpenditure) errors.foodExpenditure = 'Food expenditure is required';
    }
  
    // Section D: Nutrition Knowledge Validation
    if (currentSection === 'nutritionKnowledge' || !currentSection) {
      if (formData.receivedEducation === undefined) {
        errors.receivedEducation = 'Please specify if you received education';
      }
      if (!formData.selfRating) errors.selfRating = 'Please rate your knowledge';
      if (!formData.importantFoodGroups || formData.importantFoodGroups.length === 0) {
        errors.importantFoodGroups = 'Please select at least one food group';
      }
      if (!formData.fruitsVeggiesFrequency) {
        errors.fruitsVeggiesFrequency = 'Please specify consumption frequency';
      }
      if (!formData.wholeGrainsFrequency) {
        errors.wholeGrainsFrequency = 'Please specify consumption frequency';
      }
      if (!formData.proteinsFrequency) {
        errors.proteinsFrequency = 'Please specify consumption frequency';
      }
      if (!formData.dairyFrequency) {
        errors.dairyFrequency = 'Please specify consumption frequency';
      }
      if (!formData.mealsPerDay) errors.mealsPerDay = 'Please specify meals per day';
      if (formData.takesSupplements === undefined) {
        errors.takesSupplements = 'Please specify supplement use';
      }
      if (!formData.physicalActivity) {
        errors.physicalActivity = 'Please specify activity level';
      }
      if (formData.awareOfAvoidedFoods === undefined) {
        errors.awareOfAvoidedFoods = 'Please specify awareness of foods to avoid';
      }
      if (formData.awareOfAvoidedFoods === 'yes' && !formData.avoidedFoodsList) {
        errors.avoidedFoodsList = 'Please list foods to avoid';
      }
      if (formData.awareOfRisks === undefined) {
        errors.awareOfRisks = 'Please specify awareness of nutrition risks';
      }
    }
  
    return errors;
  };
  
  /**
   * Validates email format
   */
  export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  
  /**
   * Sanitizes form input to prevent XSS
   */
  export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };
  
  /**
   * Formats form data for submission
   */
  export const formatSubmissionData = (formData) => {
    return {
      demographics: {
        ...formData.demographics,
        childrenCount: formData.demographics.hasChildren === 'yes' 
          ? parseInt(formData.demographics.childrenCount) || 0 
          : 0
      },
      culturalFactors: {
        ...formData.culturalFactors,
        hasRestrictions: formData.culturalFactors.hasRestrictions === 'yes',
        followsRituals: formData.culturalFactors.followsRituals === 'yes'
      },
      economicFactors: {
        ...formData.economicFactors,
        dependents: parseInt(formData.economicFactors.dependents) || 0
      },
      nutritionKnowledge: {
        ...formData.nutritionKnowledge,
        receivedEducation: formData.nutritionKnowledge.receivedEducation === 'yes',
        takesSupplements: formData.nutritionKnowledge.takesSupplements === 'yes',
        awareOfAvoidedFoods: formData.nutritionKnowledge.awareOfAvoidedFoods === 'yes',
        awareOfRisks: formData.nutritionKnowledge.awareOfRisks === 'yes'
      },
      metadata: {
        submissionDate: new Date().toISOString(),
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`
      }
    };
  };