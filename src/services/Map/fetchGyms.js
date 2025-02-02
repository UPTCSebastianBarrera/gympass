import axios from 'axios';
import geocodeAddress from './geoLocalization';

const fetchGyms = async () => {
  try {
    //https://gympass-backend.vercel.app
    const { data } = await axios.get('https://gympass-backend.vercel.app/api/gyms', { timeout: 10000 });
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
