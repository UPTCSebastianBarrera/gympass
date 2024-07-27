import axios from 'axios';

export const fetchUserDataFromLocalStorage = () => {
  const storedUserData = localStorage.getItem('userData');
  return storedUserData ? JSON.parse(storedUserData) : { name: 'Invitado', profilePicture: 'https://via.placeholder.com/50', address: 'N/A' };
};

export const loginUser = async (emailOrName, password, setUserData, setIsLoggedIn) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', { emailOrName, password });
    const data = response.data;
    setUserData(data);
    setIsLoggedIn(true);
    localStorage.setItem('userData', JSON.stringify(data));
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    alert('Invalid email/name or password');
  }
};

export const logoutUser = (setUserData, setIsLoggedIn) => {
  setIsLoggedIn(false);
  setUserData({ name: 'Invitado', profilePicture: 'https://via.placeholder.com/50', address: 'N/A' });
  localStorage.removeItem('userData');
};

export const registerUser = async (userDetails, setUserData, setIsLoggedIn) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users', userDetails);
    const data = response.data;
    if (response.status === 201) {
      alert('User registered successfully!');
      setUserData(data);
      setIsLoggedIn(true);
      localStorage.setItem('userData', JSON.stringify(data));
    }
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    alert('Error registering user');
  }
};
