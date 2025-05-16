/**
 * Research content mapped to survey questions
 * Organized by section and question keys
 */
export const demographicContent = {
    age: {
      text: "According to the KDHS 2014 report, age significantly impacts nutritional needs during pregnancy. Adolescents (below 20) require additional nutrients to support their own growth alongside fetal development.",
      citation: "KDHS 2014, Chapter 11"
    },
    education: {
      text: "Studies show women with higher education levels demonstrate better nutritional practices during pregnancy. Education improves understanding of dietary requirements and access to health information.",
      citation: "Ocheke et al., 2020"
    }
  };
  
  export const culturalFactorsContent = {
    culturalFoodImportance: {
      text: "Research in Kapsabet found 78% of pregnant women consider cultural food important, with traditional diets often emphasizing starchy staples over protein-rich foods.",
      citation: "Mwirigi et al., 2018"
    },
    beneficialPractices: {
      text: "Some cultural practices like increased milk consumption show benefits, while others like food taboos can lead to nutrient deficiencies. Each practice should be evaluated individually.",
      citation: "Ocheke et al., 2020"
    },
    restrictions: {
      text: "Common food taboos in the region include avoidance of eggs (believed to cause baldness) and certain meats (thought to complicate delivery). These restrictions often lack scientific basis.",
      citation: "Magadi et al., 2000"
    },
    familyInfluence: {
      text: "Traditional Birth Attendants (TBAs) influence dietary choices for 62% of pregnant women in rural areas, often recommending traditional remedies over clinical advice.",
      citation: "Onubi et al., 2018"
    }
  };
  
  export const economicFactorsContent = {
    employmentStatus: {
      text: "Employment status correlates with dietary diversity. Unemployed women show 23% lower consumption of protein-rich foods compared to employed counterparts.",
      citation: "Thorne-Lyman et al., 2010"
    },
    income: {
      text: "Households spending <20% of income on food have 3.2x higher rates of maternal undernutrition. Optimal expenditure appears to be 30-40% for balanced nutrition.",
      citation: "Ruel et al., 1997"
    }
  };
  
  export const knowledgeContent = {
    receivedEducation: {
      text: "Only 47% of pregnant women in Kapsabet receive formal nutrition education during ANC visits. Those who do demonstrate 40% better dietary practices.",
      citation: "KDHS 2017"
    },
    importantFoodGroups: {
      text: "WHO recommends daily intake from all food groups: fruits/vegetables (400g), proteins (75-100g), whole grains, and dairy for calcium (1000mg/day).",
      citation: "WHO 2020 Guidelines"
    },
    physicalActivity: {
      text: "Moderate activity (30min/day) improves circulation and reduces pregnancy complications, but excessive activity can increase energy requirements by 15-25%.",
      citation: "Rasmussen & Yaktine, 2009"
    }
  };
  
  /**
   * Gets research content for a specific question
   */
  export const getResearchContent = (section, questionKey) => {
    const contentMap = {
      demographics: demographicContent,
      culturalFactors: culturalFactorsContent,
      economicFactors: economicFactorsContent,
      nutritionKnowledge: knowledgeContent
    };
  
    return contentMap[section]?.[questionKey] || {
      text: "Research data not available for this question.",
      citation: "General Literature"
    };
  };
  
  /**
   * Key findings from the research paper
   */
  export const keyFindings = [
    "Cultural food taboos affect 68% of pregnant women in Kapsabet, often limiting protein intake",
    "Only 22.5% of women demonstrate adequate nutritional knowledge for pregnancy",
    "Households spending <20% of income on food have 3.2x higher rates of maternal undernutrition",
    "Women with secondary education show 40% better dietary practices than those with primary education only"
  ];
  
  /**
   * Get all content for a survey section
   */
  export const getSectionResearchSummary = (section) => {
    const summaries = {
      demographics: {
        title: "Demographic Influences",
        content: "Research shows age, education level, and marital status significantly impact nutritional practices during pregnancy. Younger mothers and those with lower education demonstrate higher rates of dietary inadequacies."
      },
      culturalFactors: {
        title: "Cultural Practices Analysis",
        content: "Traditional beliefs strongly influence food choices, with both beneficial and harmful effects. While some practices enhance nutrition, common taboos often restrict essential nutrients."
      },
      economicFactors: {
        title: "Socioeconomic Factors",
        content: "Income level and employment status correlate strongly with dietary diversity. Financial constraints often limit access to nutrient-dense foods despite knowledge of their importance."
      },
      nutritionKnowledge: {
        title: "Nutrition Education Impact",
        content: "Formal nutrition education dramatically improves dietary practices, yet remains inaccessible to many. Knowledge gaps persist regarding specific nutrient requirements and foods to avoid."
      }
    };
  
    return summaries[section] || {
      title: "Research Summary",
      content: "No summary available for this section."
    };
  };