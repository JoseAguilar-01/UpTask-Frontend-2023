import { useNavigate, useParams } from 'react-router-dom';
import useProjects from './useProjects';

export const useProject = () => {
  const {
    currentProject,
    currentTask,
    currentCollaborator,
    loading,
    modalsStates,
    alert,
    getProject,
    deleteProject,
    deleteTask,
    deleteCollaborator,
    resetAlert,
    handleModalsStates,
    setCurrentProject,
  } = useProjects();

  const { id } = useParams();

  const navigate = useNavigate();

  const handleDeleteTask = async () => {
    await deleteTask(currentTask._id);

    resetAlert(3000);

    handleModalsStates('modalDeleteTask', false);
  };

  const handleDeleteCollaborator = async () => {
    await deleteCollaborator({
      projectId: currentProject._id,
      email: currentCollaborator.email,
    });

    resetAlert(3000);

    handleModalsStates('modalDeleteCollaborator', false);
  };

  const handleDeleteProject = async () => {
    await deleteProject(id);

    resetAlert();

    handleModalsStates('modalDeleteProject', false);

    navigate('/projects');
  };

  const openDeleteProjectModal = () => {
    handleModalsStates('modalDeleteProject', true);
  };

  const openTaskModal = () => {
    handleModalsStates('modalTask', true);
  };

  return {
    currentProject,
    loading,
    id,
    modalsStates,
    alert,
    handleModalsStates,
    handleDeleteProject,
    handleDeleteTask,
    handleDeleteCollaborator,
    openTaskModal,
    openDeleteProjectModal,
    getProject,
    setCurrentProject,
  };
};
