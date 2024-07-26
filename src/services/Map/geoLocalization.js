import axios from 'axios';

const MAPQUEST_API_KEY = 'Fyk5I5Yu5YK9PHPsBWbjOELv3V7ptYGE';

const fetchCoords = async (address, retries = 3) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${MAPQUEST_API_KEY}&location=${encodedAddress}`;
  
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await axios.get(url, { timeout: 10000 });
      const locations = response.data?.results?.[0]?.locations;
      if (locations && locations.length > 0) {
        const location = locations[0];
        return { lat: parseFloat(location.latLng.lat), lon: parseFloat(location.latLng.lng) };
      }
    } catch (error) {
      console.error(`Error geocoding address: ${address}`, error);
    }
  }
  
  return null;
};

const geoLocalization = async (address, retries = 3) => {
  const coords = await fetchCoords(address, retries);
  if (coords) return coords;
  
  const addressWithoutCity = address.split(',')[0];
  return await fetchCoords(addressWithoutCity, retries);
};

export default geoLocalization;
