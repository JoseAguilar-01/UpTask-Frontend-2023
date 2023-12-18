import useProjects from './useProjects';

export const useCollaborator = props => {
  const { collaborator } = props;

  const {
    currentProject,
    setCurrentCollaborator,
    handleModalsStates,
    deleteCollaborator,
  } = useProjects();

  const openDeleteModal = () => {
    setCurrentCollaborator(collaborator);

    handleModalsStates('modalDeleteCollaborator', true);
  };

  return { currentProject, deleteCollaborator, openDeleteModal };
};
