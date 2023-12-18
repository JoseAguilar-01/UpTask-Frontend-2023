import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProjects from './useProjects';

export const useNewCollaborator = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const {
    alert,
    currentProject,
    currentCollaborator,
    setCurrentCollaborator,
    loading,
    getCollaborator,
    getProject,
    addCollaborator,
    setAlert,
    resetAlert,
  } = useProjects();

  const { id } = useParams();

  const collaboratorIsAdded = useMemo(() => {
    const storedCollaborator = currentProject.collaborators?.find(
      collaborator => collaborator._id === currentCollaborator._id,
    );

    return !!storedCollaborator;
  }, [currentProject, currentCollaborator]);

  useEffect(() => {
    getProject(id);

    setCurrentCollaborator({});
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.email) {
      setAlert({ message: 'El email es obligatorio', isError: true });

      return resetAlert(5000);
    }

    setCurrentCollaborator({});

    getCollaborator({
      projectId: currentProject._id,
      email: formData.email,
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleAddCollaborator = async () => {
    await addCollaborator({
      projectId: currentProject._id,
      userId: currentCollaborator._id,
    });
    resetAlert(5000);
  };

  const inputsData = [
    {
      id: 'email',
      name: 'email',
      value: formData.email,
      type: 'email',
      label: 'Email',
      placeholder: 'Email del usuario',
    },
  ];

  return {
    alert,
    loading,
    inputsData,
    currentProject,
    currentCollaborator,
    collaboratorIsAdded,
    handleAddCollaborator,
    handleSubmit,
    handleChange,
  };
};
