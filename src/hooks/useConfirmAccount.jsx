import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosClient } from '../config/axiosClient';

export const useConfirmAccount = () => {
  const [alertData, setAlertData] = useState({
    isError: false,
    message: '',
  });
  const [confirmedUser, setConfirmedUser] = useState(false);

  useEffect(() => {
    confirmAccount();
  }, []);

  const params = useParams();

  const confirmAccount = async () => {
    try {
      const { data } = await axiosClient(`/users/confirm/${params.id}`);

      setAlertData({
        isError: false,
        message: data.message,
      });

      setConfirmedUser(true);
    } catch (error) {
      const { response } = error;

      console.error(response);

      setAlertData({
        isError: true,
        message: response.data.message,
      });
    }
  };

  return { alertData, confirmedUser };
};
