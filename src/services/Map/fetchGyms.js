import axios from 'axios';
import geocodeAddress from './geoLocalization';

const fetchGyms = async () => {
  try {
    const { data } = await axios.get('http://localhost:5000/api/gyms', { timeout: 10000 });
    const gymsWithCoords = await Promise.all(
      data.map(async (gym) => {
        const coords = await geocodeAddress(gym.address);
        return { ...gym, coords };
      })
    );
    return gymsWithCoords.filter(gym => gym.coords);
  } catch (error) {
    console.error('Error fetching gyms', error);
    return [];
  }
};

export default fetchGyms;
