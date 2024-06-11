// ApiService.js
import axios from 'axios';

const FIRST_API_URL = 'http://localhost:8000/data_collection/journals'; // First API URL
const SECOND_API_URL = 'http://localhost:8000/data_collection/journals/number'; // Second API URL

// Create axios instances for both APIs
const firstApiService = axios.create({
  baseURL: FIRST_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // Add any other headers if needed for the first API
  },
});

const secondApiService = axios.create({
  baseURL: SECOND_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // Add any other headers if needed for the second API
  },
});

// Function to fetch data from the first API
export const fetchFirstData = async (endpoint) => {
  try {
    const response = await firstApiService.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from first API:', error);
    throw error;
  }
};

// Function to fetch data from the second API
export const fetchSecondData = async (endpoint) => {
  try {
    const response = await secondApiService.get(endpoint, {
      // Add maxRedirects option to follow redirects
      maxRedirects: 5, // Adjust this as needed based on your server's redirect behavior
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from second API:', error);
    throw error;
  }
};

export default {
  fetchFirstData,
  fetchSecondData,
};