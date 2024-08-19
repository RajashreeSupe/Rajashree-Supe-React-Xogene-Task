import axios from 'axios';

const API_BASE_URL = 'https://rxnav.nlm.nih.gov/REST';


//DrugSearch
export const getDrugs = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/drugs.json?name=${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching drugs:', error);
    throw error;
  }
};


export const getSpellingSuggestions = async (name) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/spellingsuggestions.json?name=${name}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching spelling suggestions:', error);
      throw error;
    }
}

export const getDrugDetails = async (rxcui) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/rxcui/${rxcui}/allProperties.json`);
      return response.data;
    } catch (error) {
      console.error('Error fetching drug details:', error);
      throw error;
    }
  };


export const getNDCs = async (rxcui) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rxcui/${rxcui}/ndcs.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching NDCs:', error);
    throw error;
  }
};