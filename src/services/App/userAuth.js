import axios from 'axios';

export const fetchUserDataFromLocalStorage = () => {
  const storedUserData = localStorage.getItem('userData');
  return storedUserData ? JSON.parse(storedUserData) : { name: 'Invitado', profilePicture: 'https://via.placeholder.com/50', address: 'N/A' };
};

// En userAuth.js o un archivo similar
export const loginUser = async (emailOrName, password, setUserData, setIsLoggedIn) => {
  try {
    const response = await axios.post('https://gympass-backend.vercel.app/api/users/login', { emailOrName, password });
    const data = response.data;
    const isAdmin = data.email === 'administrador@gmail.com';
    setUserData({ ...data, isAdmin });
    setIsLoggedIn(true);
    localStorage.setItem('userData', JSON.stringify({ ...data, isAdmin }));
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    alert('Invalid email/name or password');
  }
};

export const logoutUser = (setUserData, setIsLoggedIn) => {
  setIsLoggedIn(false);
  setUserData({ name: 'Invitado', profilePicture: 'https://via.placeholder.com/50', address: 'N/A', isAdmin: false });
  localStorage.removeItem('userData');
};

export const registerUser = async (userDetails, setUserData, setIsLoggedIn) => {
  try {
    const response = await axios.post('https://gympass-backend.vercel.app/api/users', userDetails);
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
