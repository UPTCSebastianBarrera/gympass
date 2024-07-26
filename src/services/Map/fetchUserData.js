const fetchUserData = () => {
  const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
    return JSON.parse(storedUserData);
  }
  return { name: 'Invitado', profilePicture: 'https://via.placeholder.com/50', address: 'N/A' };
};

export default fetchUserData;
