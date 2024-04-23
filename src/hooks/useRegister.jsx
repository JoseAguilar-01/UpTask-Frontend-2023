import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../config/axiosClient';

export const useRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [alertData, setAlertData] = useState({
    isError: false,
    message: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const { password, repeatPassword } = formData;

    if (Object.values(formData).includes('')) {
      setAlertData({
        isError: true,
        message: 'Todos los campos son obligatorios',
      });

      resetAlertData();

      return;
    }

    if (password !== repeatPassword) {
      setAlertData({
        isError: true,
        message: 'Las contraseñas deben ser iguales',
      });

      resetAlertData();

      return;
    }

    if (password.length < 6) {
      setAlertData({
        isError: true,
        message: 'La contraseña es muy corta, agrega mínimo 6 caracteres',
      });

      resetAlertData();

      return;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const { repeatPassword, ...restData } = formData;

      const { data } = await axiosClient.post('/users', restData);

      setAlertData({
        isError: false,
        message: data.message,
      });

      resetAlertData();

      setFormData({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
      });

      navigate('/confirm-account');
    } catch (error) {
      const { response } = error;

      console.error(response);

      setAlertData({
        isError: true,
        message: response.data.message,
      });

      resetAlertData();
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const resetAlertData = () => {
    setTimeout(() => {
      setAlertData({
        isError: false,
        message: '',
      });
    }, 10000);
  };

  return {
    formData,
    alertData,
    setFormData,
    setAlertData,
    handleSubmit,
    handleChange,
  };
};
