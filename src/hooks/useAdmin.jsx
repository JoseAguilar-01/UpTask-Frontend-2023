import { useAuth } from './useAuth';
import useProjects from './useProjects';

export const useAdmin = project => {
  const { currentProject } = useProjects();
  const { authData } = useAuth();

  const isAdmin = project
    ? project.creator === authData._id
    : currentProject.creator === authData._id;

  return { isAdmin };
};
