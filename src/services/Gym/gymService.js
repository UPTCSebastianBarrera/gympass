import axios from 'axios';
//https://gympass-backend.vercel.app
const API_URL = 'https://gympass-backend.vercel.app/api/gyms';

export const getGyms = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching gyms:', error);
    throw error;
  }
};

export const createGym = async (gymData) => {
  try {
    const response = await axios.post(API_URL, gymData);
    return response.data;
  } catch (error) {
    console.error('Error creating gym:', error);
    throw error;
  }
};

export const updateGym = async (id, gymData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, gymData);
    return response.data;
  } catch (error) {
    console.error('Error updating gym:', error);
    throw error;
  }
};

export const deleteGym = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error deleting gym:', error);
    throw error;
  }
};