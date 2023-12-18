import { useEffect, useState } from 'react';
import useProjects from './useProjects';
import { formatDate } from '../helpers/formatDate';

export const useModalTaskForm = () => {
  const {
    modalsStates,
    currentProject,
    currentTask,
    alert,
    setAlert,
    setCurrentTask,
    handleModalsStates,
    submitTask,
    resetAlert,
  } = useProjects();

  const { modalTask: isOpen } = modalsStates;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deadline: '',
    priority: 'High',
  });

  useEffect(() => {
    if (currentTask._id && isOpen) {
      const { name, description, deadline, priority } = currentTask;

      setFormData({
        name,
        description,
        deadline: formatDate(deadline).rawDate,
        priority,
      });
    }
  }, [isOpen]);

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (Object.values(formData).includes('')) {
      setAlert({
        message: 'Todos los campos son obligatorios',
        isError: true,
      });

      return resetAlert(3000);
    }

    let status = false;

    const data = { ...formData, project: currentProject._id };

    if (currentTask._id) {
      data.id = currentTask._id;
      data.completed = currentTask.completed;
    }

    // eslint-disable-next-line no-unused-vars
    status = await submitTask(data);

    if (status) {
      closeModal();
      resetAlert(3000);
    }
  };

  const closeModal = () => {
    handleModalsStates('modalTask', false);

    setTimeout(() => {
      resetForm();
      setCurrentTask({});
    }, 500);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', deadline: '', priority: 'High' });
  };

  const inputsData = [
    {
      id: 'name',
      name: 'name',
      value: formData.name,
      type: 'text',
      label: 'Nombre',
      placeholder: 'Nombre de la tarea',
    },
    {
      id: 'deadline',
      name: 'deadline',
      value: formData.deadline,
      type: 'date',
      label: 'Fecha de entrega',
    },
    {
      id: 'priority',
      name: 'priority',
      value: formData.priority,
      type: 'select',
      options: [
        {
          label: 'HIGH',
          value: 'High',
        },
        {
          label: 'MEDIUM',
          value: 'Medium',
        },
        {
          label: 'LOW',
          value: 'Low',
        },
      ],
      label: 'Prioridad',
      placeholder: 'Prioridad de la tarea',
    },
    {
      id: 'description',
      name: 'description',
      value: formData.description,
      type: 'textarea',
      label: 'Descripción de la tarea',
    },
  ];

  return {
    formData,
    isOpen,
    inputsData,
    currentTask,
    alert,
    setFormData,
    handleChange,
    handleSubmit,
    closeModal,
  };
};
