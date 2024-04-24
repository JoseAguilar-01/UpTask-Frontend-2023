import { createContext, useEffect, useMemo, useState } from 'react';
import { axiosClient } from '../config/axiosClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });
  const [alertData, setAlertData] = useState({
    isError: false,
    message: '',
  });
  const [authData, steAuthData] = useState({});
  const [loading, setLoading] = useState(true);
  const [enableVerification, setEnableVerification] = useState(false);

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axiosClient('/users/profile', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      steAuthData(data);
    } catch (error) {
      console.log(error.response);
    }

    setLoading(false);
  };

  const handleLoginChange = e => {
    const { name, value } = e.target;

    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleLoginSubmit = async e => {
    e.preventDefault();

    if (Object.values(loginFormData).includes('')) {
      setAlertData({
        isError: true,
        message: 'Todos los campos son obligatorios',
      });

      resetAlertData();
      return;
    }

    if (loginFormData.password.length < 6) {
      setAlertData({
        isError: true,
        message: 'El password es muy corto',
      });

      resetAlertData();
      return;
    }

    try {
      const { data } = await axiosClient.post('/users/login', loginFormData);

      localStorage.setItem('token', data.token);

      steAuthData(data);

      setAlertData({ isError: false, message: '' });

      setLoginFormData({
        password: '',
        email: '',
      });
    } catch (error) {
      console.error(
        '🚀 ~ file: useLogin.jsx ~ handleLoginSubmit ~ response:',
        error,
      );

      if (error.response.status === 403) {
        setEnableVerification(true);
      }

      setAlertData({
        isError: true,
        message: error.response.data.message,
      });

      resetAlertData();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');

    steAuthData({});
  };

  const resetAlertData = () => {
    setTimeout(() => {
      setAlertData({
        isError: false,
        message: '',
      });
    }, 10000);
  };

  const value = useMemo(
    () => ({
      loginFormData,
      alertData,
      authData,
      loading,
      enableVerification,
      setEnableVerification,
      logout,
      handleLoginChange,
      handleLoginSubmit,
    }),
    [
      loginFormData,
      alertData,
      authData,
      enableVerification,
      setEnableVerification,
      logout,
      handleLoginChange,
      handleLoginSubmit,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
