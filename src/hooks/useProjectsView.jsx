import { useEffect } from 'react';
import useProjects from './useProjects';

export const useProjectsView = () => {
  const { socket, handleAddProject, handleDeleteProject } = useProjects();

  useEffect(() => {
    socket.on('addedCollaborator', handleAddProject);

    socket.on('deletedCollaborator', handleDeleteProject);

    return () => {
      socket.off('addedCollaborator');
      socket.off('deletedCollaborator');
    };
  }, []);

  return {};
};
