import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosClient } from '../config/axiosClient';

export const useNewPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    repeatPassword: '',
  });
  const [alertData, setAlertData] = useState({
    isError: false,
    message: '',
  });
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    confirmToken();
  }, []);

  const confirmToken = async () => {
    try {
      await axiosClient(`/users/forgot-password/${token}`);

      setIsValidToken(true);
    } catch (error) {
      const { response } = error;

      console.log(
        '🚀 ~ file: useNewPassword.jsx ~ confirmToken ~ response:',
        response,
      );

      setAlertData({ isError: true, message: response.data.message });
    }
  };

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
      const { password } = formData;

      const { data } = await axiosClient.post(
        `/users/forgot-password/${token}`,
        { password },
      );

      setAlertData({
        isError: false,
        message: data.message,
      });

      setFormData({
        password: '',
        repeatPassword: '',
      });

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      const { response } = error;

      console.log(
        '🚀 ~ file: useNewPassword.jsx ~ handleSubmit ~ response:',
        response,
      );

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
      setAlertData({ isError: false, message: '' });
    }, 10000);
  };

  return { formData, alertData, isValidToken, handleChange, handleSubmit };
};
