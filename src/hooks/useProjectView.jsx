import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useProject } from './useProject';
import useProjects from './useProjects';

export const useProjectView = () => {
  const {
    socket,
    getProject,
    currentProject,
    handleDeleteProject,
    handleAddTask,
    handleDeleteTask,
    handleUpdateTask,
  } = useProjects();

  const { id } = useProject();

  const navigate = useNavigate();

  useEffect(() => {
    getProject(id).then(result => !result && navigate('/projects'));

    socket.emit('openProject', id);
  }, []);

  useEffect(() => {
    socket.on('addedTask', handleAddTask);

    socket.on('changedTaskStatus', handleUpdateTask);

    socket.on('deletedTask', handleDeleteTask);

    socket.on('udpatedTask', handleUpdateTask);

    socket.on('deletedCollaborator', projectID => {
      handleDeleteProject(projectID);

      if (id === projectID) {
        navigate('/projects');
      }
    });

    return () => {
      socket.off('addedTask');
      socket.off('changedTaskStatus');
      socket.off('deletedTask');
      socket.off('updatedTask');
      socket.off('deletedCollaborator');
    };
  }, [currentProject]);

  return {};
};
