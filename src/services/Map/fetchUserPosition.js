const fetchUserPosition = (setUserPosition, setGeoError) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        setGeoError('No se pudo obtener su ubicación. Asegúrese de que los servicios de ubicación estén habilitados.');
        console.error('Error obteniendo la ubicación', error);
      }
    );
  } else {
    setGeoError('La geolocalización no es compatible con este navegador.');
  }
};

export default fetchUserPosition;
