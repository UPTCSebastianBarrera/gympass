import { useEffect } from 'react';
import fetchGyms from './fetchGyms';
import fetchUserData from './fetchUserData';
import fetchUserPosition from './fetchUserPosition';

const useInitializeData = (setGyms, setUserData, setUserPosition, setGeoError) => {
  useEffect(() => {
    const initializeData = async () => {
      const gymsData = await fetchGyms();
      setGyms(gymsData);
      const userData = fetchUserData();
      setUserData(userData);
      fetchUserPosition(setUserPosition, setGeoError);
    };

    initializeData();
  }, [setGyms, setUserData, setUserPosition, setGeoError]);
};

export default useInitializeData;
