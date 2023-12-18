import { useState } from 'react';
import useProjects from './useProjects';

export const useTask = props => {
  const [loadingStates, setLoadingStates] = useState({
    deleteTask: false,
    updateState: false,
  });

  const { changeTaskStatus, setCurrentTask, handleModalsStates } =
    useProjects();

  const { task } = props;

  const handleUpdateState = async () => {
    handleLoadingStates('updateState', true);

    const { _id } = task;

    await changeTaskStatus(_id);

    handleLoadingStates('updateState', false);
  };

  const handleLoadingStates = (name, value) => {
    setLoadingStates({ ...loadingStates, [name]: value });
  };

  const openModalForm = () => {
    setCurrentTask(task);

    handleModalsStates('modalTask', true);
  };

  const openDeleteModal = () => {
    setCurrentTask(task);

    handleModalsStates('modalDeleteTask', true);
  };

  return {
    loadingStates,
    openDeleteModal,
    handleUpdateState,
    openModalForm,
  };
};
