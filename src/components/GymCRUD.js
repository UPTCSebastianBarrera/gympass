// src/components/GymCRUD.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from './Alert';
import './GymCRUD.css';

const GymCRUD = () => {
  const [gyms, setGyms] = useState([]);
  const [newGym, setNewGym] = useState({
    name: '',
    address: '',
    description: '',
    schedule: '',
    price: '',
    plans: '',
    tags: ''
  });
  const [editingGym, setEditingGym] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchGyms();
  }, []);

  const fetchGyms = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/admin/gyms');
      setGyms(data);
    } catch (error) {
      console.error('Error fetching gyms:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGym({ ...newGym, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const gymData = {
        ...newGym,
        plans: newGym.plans.split(',').map(plan => plan.trim()),
        tags: newGym.tags.split(',').map(tag => tag.trim())
      };

      if (editingGym) {
        await axios.put(`http://localhost:5000/api/admin/gyms/${editingGym._id}`, gymData);
        setAlert({ message: 'Gimnasio actualizado exitosamente', type: 'success' });
      } else {
        await axios.post('http://localhost:5000/api/admin/gyms', gymData);
        setAlert({ message: 'Gimnasio agregado exitosamente', type: 'success' });
      }
      fetchGyms();
      resetForm();
    } catch (error) {
      console.error('Error saving gym:', error);
      setAlert({ message: 'Error al guardar el gimnasio', type: 'error' });
    }
  };

  const handleEdit = (gym) => {
    setEditingGym(gym);
    setNewGym({
      ...gym,
      plans: gym.plans.join(', '),
      tags: gym.tags.join(', ')
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este gimnasio?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/gyms/${id}`);
        setGyms(gyms.filter(gym => gym._id !== id));
        setAlert({ message: 'Gimnasio eliminado exitosamente', type: 'success' });
      } catch (error) {
        console.error('Error al eliminar el gimnasio:', error);
        setAlert({ message: 'Error al eliminar el gimnasio', type: 'error' });
      }
    }
  };

  const resetForm = () => {
    setNewGym({
      name: '',
      address: '',
      description: '',
      schedule: '',
      price: '',
      plans: '',
      tags: ''
    });
    setEditingGym(null);
  };

  return (
    <div className="gym-crud">
      {alert && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert(null)} 
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={newGym.name}
          onChange={handleInputChange}
          placeholder="Nombre"
          required
        />
        <input
          name="address"
          value={newGym.address}
          onChange={handleInputChange}
          placeholder="Dirección"
          required
        />
        <textarea
          name="description"
          value={newGym.description}
          onChange={handleInputChange}
          placeholder="Descripción"
          required
        />
        <input
          name="schedule"
          value={newGym.schedule}
          onChange={handleInputChange}
          placeholder="Horario"
          required
        />
        <input
          name="price"
          value={newGym.price}
          onChange={handleInputChange}
          placeholder="Precio"
          required
        />
        <input
          name="plans"
          value={newGym.plans}
          onChange={handleInputChange}
          placeholder="Planes (separados por coma)"
          required
        />
        <input
          name="tags"
          value={newGym.tags}
          onChange={handleInputChange}
          placeholder="Tags (separados por coma)"
          required
        />
        <button type="submit">
          {editingGym ? 'Actualizar' : 'Crear'} Gimnasio
        </button>
        {editingGym && (
          <button type="button" onClick={resetForm}>
            Cancelar Edición
          </button>
        )}
      </form>
      <ul>
        {gyms.map((gym) => (
          <li key={gym._id}>
            <h3>{gym.name}</h3>
            <p>Dirección: {gym.address}</p>
            <p>Descripción: {gym.description}</p>
            <p>Horario: {gym.schedule}</p>
            <p>Precio: {gym.price}</p>
            <p>Planes: {gym.plans.join(', ')}</p>
            <p>Tags: {gym.tags.join(', ')}</p>
            <button onClick={() => handleEdit(gym)}>Editar</button>
            <button onClick={() => handleDelete(gym._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GymCRUD;
