import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../config/axiosClient';

export const useForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [alert, setAlert] = useState({
    isError: false,
    message: '',
  });

  const navigate = useNavigate();

  const handleRequestToken = async e => {
    e.preventDefault();

    try {
      const { data } = await axiosClient.post('/users/forgot-password', {
        email,
      });

      setAlert({ isError: false, message: data.message });

      setEmail('');
    } catch (error) {
      const { response } = error;

      console.error(
        '🚀 ~ file: useForgotPassword.jsx ~ handleRequestToken ~ response:',
        response,
      );

      setAlert({ isError: true, message: response.data.message });

      resetAlert();
    }
  };

  const handleValidateToken = async e => {
    e.preventDefault();

    try {
      const { data } = await axiosClient(`/users/forgot-password/${token}`);

      setAlert({ isError: false, message: data.message });

      setTimeout(() => {
        navigate(`forgot-password/${token}`);
        setToken('');
      }, 2000);
    } catch (error) {
      const { response } = error;

      console.error(
        '🚀 ~ file: useForgotPassword.jsx ~ handleValidateToken ~ response:',
        response,
      );

      setAlert({ isError: true, message: response.data.message });

      resetAlert();
    }
  };

  const resetAlert = () => {
    setTimeout(() => {
      setAlert({ isError: false, message: '' });
    }, 5000);
  };

  return {
    alert,
    email,
    token,
    setEmail,
    setToken,
    handleRequestToken,
    handleValidateToken,
  };
};
