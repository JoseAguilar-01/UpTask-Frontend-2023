import { useState } from 'react';
import { axiosClient } from '../config/axiosClient';

export const useForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({
    isError: false,
    message: '',
  });

  const handleSubmit = async e => {
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
        '🚀 ~ file: useForgotPassword.jsx ~ handleSubmit ~ response:',
        response,
      );

      setAlert({ isError: true, message: response.data.message });

      resetEmail();
    }
  };

  const resetEmail = () => {
    setTimeout(() => {
      setAlert({ isError: false, message: '' });
    }, 10000);
  };

  return { alert, email, setEmail, handleSubmit };
};
