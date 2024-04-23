import { useState } from 'react';
import { axiosClient } from '../config/axiosClient';

export const useConfirmAccount = () => {
  const [alertData, setAlertData] = useState({
    isError: false,
    message: '',
  });
  const [confirmFormData, setConfirmFormData] = useState({
    token: '',
  });
  const [confirmedUser, setConfirmedUser] = useState(false);

  const confirmAccount = async e => {
    e.preventDefault();

    if (Object.values(confirmFormData).includes('')) {
      setAlertData({
        isError: true,
        message: 'Todos los campos son obligatorios',
      });
    }

    try {
      const { data } = await axiosClient(
        `/users/confirm/${confirmFormData.token}`,
      );

      setAlertData({
        isError: false,
        message: data.message,
      });

      resetConfirmFormData();

      setConfirmedUser(true);
    } catch (error) {
      const { response } = error;

      setAlertData({
        isError: true,
        message: response.data.message,
      });

      resetAlertData();
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setConfirmFormData({ ...confirmFormData, [name]: value });
  };

  const resetConfirmFormData = () => {
    setConfirmFormData({ token: '' });
  };

  const resetAlertData = () => {
    setTimeout(() => {
      setAlertData({ isError: false, message: '' });
    }, 5000);
  };

  return {
    alertData,
    confirmedUser,
    confirmFormData,
    handleChange,
    confirmAccount,
  };
};
