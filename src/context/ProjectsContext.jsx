import { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { axiosClient } from '../config/axiosClient';
import { useAuth } from '../hooks/useAuth';
import { socketManager } from '../sockets/socket';

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({});
  const [currentTask, setCurrentTask] = useState({});
  const [currentCollaborator, setCurrentCollaborator] = useState({});
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({
    message: '',
    isError: false,
  });
  const [modalsStates, setModalsStates] = useState({
    modalTask: false,
    modalDeleteTask: false,
    modalDeleteProject: false,
    modalDeleteCollaborator: false,
  });

  const currentTimeout = useRef();

  const socket = useMemo(() => socketManager.socket('/'), []);

  const { authData } = useAuth();

  useEffect(() => {
    if (authData._id) {
      listProjects();

      socket.emit('openApp', authData.email);
    }
  }, [authData]);

  const listProjects = async () => {
    setLoading(true);

    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return console.error('El token de autenticación no existe');
    }

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axiosClient('/projects', config);

      setProjects(data);
    } catch (error) {
      console.log(
        '🚀 ~ file: ProjectsContext.jsx ~ listProjects ~ response:',
        error,
      );
    }

    setLoading(false);
  };

  const submitProject = async project => {
    if (!project) {
      return console.error(
        '🚀 ~ file: ProjectsContext.jsx ~ submitProject ~ error:',
        'Los datos del proyecto son obligatorios',
      );
    }

    if (project.id) {
      return await updateProject(project);
    }

    return await createProject(project);
  };

  const createProject = async project => {
    setLoading(true);

    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return console.error('El token de autenticación no existe');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axiosClient.post('/projects', project, config);

      setProjects([...projects, data]);

      clearTimeout(currentTimeout.current);

      setAlert({
        message: 'Proyecto creado exitosamente',
        isError: false,
      });

      setLoading(false);

      return true;
    } catch (error) {
      console.log(
        '🚀 ~ file: ProjectsContext.jsx ~ createProject ~ error:',
        error,
      );

      setAlert({ message: error.response.data.message, isError: true });

      setLoading(false);

      return false;
    }
  };

  const updateProject = async project => {
    setLoading(true);

    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return console.error('El token de autenticación no existe');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axiosClient.put(
        `/projects/${project.id}`,
        project,
        config,
      );

      const newProjectList = projects.map(element =>
        element._id === project.id ? data : element,
      );

      setProjects(newProjectList);

      setCurrentProject({ ...data, tasks: currentProject.tasks });

      clearTimeout(currentTimeout.current);

      setAlert({
        message: 'Proyecto actualizado exitosamente',
        isError: false,
      });

      setLoading(false);

      return true;
    } catch (error) {
      console.log(
        '🚀 ~ file: ProjectsContext.jsx ~ updateProject ~ error:',
        error,
      );

      setAlert({ message: error.response.data.message, isError: true });

      setLoading(false);

      return false;
    }
  };

  const getProject = async id => {
    setLoading(true);

    resetAlert();

    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return console.error('El token de autenticación no existe');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axiosClient(`/projects/${id}`, config);

      setCurrentProject(data);

      return true;
    } catch (error) {
      console.error(
        '🚀 ~ file: ProjectsContext.jsx ~ getProject ~ error:',
        error,
      );

      setAlert({ message: error.response.data.message, isError: true });

      resetAlert(3000);

      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async id => {
    setLoading(true);

    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return console.error('El token de autenticación no existe');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const requestsToDeleteTasks = currentProject.tasks.map(task =>
      deleteTask(task._id),
    );

    const requestToDeleteProject = axiosClient.delete(
      `/projects/${id}`,
      config,
    );

    try {
      if (requestsToDeleteTasks.length) {
        await Promise.all([requestToDeleteProject, ...requestsToDeleteTasks]);
      } else {
        await requestToDeleteProject;
      }

      const newProjectList = projects.filter(element => element._id !== id);

      setProjects(newProjectList);

      setCurrentProject({});

      clearTimeout(currentTimeout.current);

      setAlert({
        message: 'Proyecto eliminado exitosamente',
        isError: false,
      });

      setLoading(false);

      return true;
    } catch (error) {
      console.log(
        '🚀 ~ file: ProjectsContext.jsx ~ deleteProject ~ error:',
        error,
      );

      setAlert({ message: error.response.data.message, isError: true });

      setLoading(false);

      return false;
    }
  };

  const submitTask = async task => {
    if (!task) {
      return console.error(
        '🚀 ~ file: ProjectsContext.jsx ~ submitTask ~ error:',
        'Los datos de la tarea son obligatorios',
      );
    }

    if (task.id) {
      return await updateTask(task);
    }

    return await createTask(task);
  };

  const createTask = async task => {
    setLoading(true);

    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return console.error('El token de autenticación no existe');
    }

    if (!task.project) {
      setLoading(false);
      return console.error('La tarea no posee el id del proyecto asociado');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axiosClient.post('/tasks', task, config);

      socket.emit('newTask', data);

      clearTimeout(currentTimeout.current);

      setAlert({
        message: 'Tarea creada exitosamente',
        isError: false,
      });

      setLoading(false);

      return true;
    } catch (error) {
      console.log(
        '🚀 ~ file: ProjectsContext.jsx ~ createTask ~ error:',
        error,
      );

      setAlert({ message: error.response.data.message, isError: true });

      setLoading(false);

      return false;
    }
  };

  const changeTaskStatus = async id => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return console.error('El token de autenticación no existe');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axiosClient.put(`/tasks/${id}/estate`, {}, config);

      socket.emit('changeTaskStatus', data);
    } catch (error) {
      console.log(
        '🚀 ~ file: ProjectsContext.jsx ~ changeTaskStatus ~ error:',
        error,
      );
    }
  };

  const updateTask = async task => {
    setLoading(true);

    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return console.error('El token de autenticación no existe');
    }

    if (!task.id) {
      setLoading(false);
      return console.error('El id de la tarea no existe');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axiosClient.put(`/tasks/${task.id}`, task, config);

      socket.emit('updateTask', data);

      clearTimeout(currentTimeout.current);

      setAlert({
        message: 'Tarea actualizada exitosamente',
        isError: false,
      });

      setLoading(false);

      return true;
    } catch (error) {
      console.log(
        '🚀 ~ file: ProjectsContext.jsx ~ updateTask ~ error:',
        error,
      );

      setAlert({ message: error.response.data.message, isError: true });

      setLoading(false);

      return false;
    }
  };

  const getTask = async id => {
    setLoading(true);

    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return console.error('El token de autenticación no existe');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axiosClient(`/tasks/${id}`, config);

      setCurrentTask(data);
    } catch (error) {
      console.error('🚀 ~ file: ProjectsContext.jsx ~ getTask ~ error:', error);

      setAlert({ message: error.response.data.message, isError: true });
    }
    setLoading(false);
  };

  const deleteTask = async id => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return console.error('El token de autenticación no existe');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axiosClient.delete(`/tasks/${id}`, config);

      socket.emit('deleteTask', { projectID: currentProject._id, taskID: id });

      setCurrentTask({});

      clearTimeout(currentTimeout.current);

      setAlert({
        message: 'Tarea eliminada exitosamente',
        isError: false,
      });

      return true;
    } catch (error) {
      console.log(
        '🚀 ~ file: ProjectsContext.jsx ~ deleteTask ~ error:',
        error,
      );

      setAlert({ message: error.response.data.message, isError: true });

      return false;
    }
  };

  const getCollaborator = async props => {
    setLoading(true);

    const { projectId, email } = props;

    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return console.error('El token de autenticación no existe');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axiosClient.get(
        `/projects/${projectId}/collaborators/${email}`,
        config,
      );

      setCurrentCollaborator(data);
      setAlert({});
    } catch (error) {
      console.error(
        '🚀 ~ file: ProjectsContext.jsx ~ getCollaborator ~ error:',
        error,
      );

      setAlert({ message: error.response.data.message, isError: true });

      resetAlert(3000);
    }

    setLoading(false);
  };

  const addCollaborator = async props => {
    setLoading(true);

    const { projectId, userId } = props;

    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return console.error('El token de autenticación no existe');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axiosClient.post(
        `projects/${projectId}/collaborators`,
        { userId },
        config,
      );

      const updatedProject = {
        ...currentProject,
        collaborators: [...currentProject.collaborators, data],
      };

      socket.emit('addCollaborator', {
        project: updatedProject,
        userEmail: data.email,
      });

      setCurrentProject(updatedProject);

      setAlert({
        message: 'Colaborador agregado exitosamente',
        isError: false,
      });
    } catch (error) {
      console.error(
        '🚀 ~ file: ProjectsContext.jsx ~ addCollaborator ~ error:',
        error,
      );

      setAlert({ message: error.response.data.message, isError: true });

      resetAlert(3000);
    }

    setLoading(false);
  };

  const deleteCollaborator = async props => {
    const { projectId, email } = props;

    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return console.error('El token de autenticación no existe');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axiosClient.delete(
        `/projects/${projectId}/collaborators/${email}`,
        config,
      );

      socket.emit('deleteCollaborator', {
        projectID: projectId,
        userEmail: email,
      });

      const filteredCollaborators = currentProject.collaborators.filter(
        collaborator => collaborator.email !== email,
      );

      setCurrentProject({
        ...currentProject,
        collaborators: filteredCollaborators,
      });

      setAlert({
        isError: false,
        message: data.message,
      });
    } catch (error) {
      console.error(
        '🚀 ~ file: ProjectsContext.jsx ~ getCollaborator ~ error:',
        error,
      );

      setAlert({ message: error.response.data.message, isError: true });

      resetAlert(3000);
    }
  };

  const handleAddProject = project => {
    setProjects(storedProjects => [...storedProjects, project]);
  };

  const handleDeleteProject = projectID => {
    setProjects(storedProjects => {
      const filteredProjects = storedProjects.filter(
        project => project._id !== projectID,
      );

      return filteredProjects;
    });
  };

  const handleAddTask = task => {
    const updatedTaskList = [...currentProject.tasks, task];

    const updatedProject = { ...currentProject, tasks: updatedTaskList };

    setCurrentProject(updatedProject);
  };

  const handleUpdateTask = updatedTask => {
    setCurrentProject(storedProject => {
      const updatedTaskList = storedProject.tasks.map(task =>
        task._id === updatedTask._id ? updatedTask : task,
      );

      const updatedProject = { ...storedProject, tasks: updatedTaskList };

      return updatedProject;
    });
  };

  const handleDeleteTask = taskID => {
    setCurrentProject(storedProject => {
      const updatedTaskList = storedProject.tasks.filter(
        task => task._id !== taskID,
      );

      const updatedProject = { ...storedProject, tasks: updatedTaskList };

      return updatedProject;
    });
  };

  const handleModalsStates = (name, value) => {
    setModalsStates({ ...modalsStates, [name]: value });
  };

  const handleShowSearch = () => {
    setSearch(!search);
  };

  const handleResetStates = () => {
    setProjects([]);
    setCurrentProject({});
    setCurrentTask({});
    setCurrentCollaborator({});
  };

  const resetAlert = delay => {
    const timeoutId = setTimeout(() => {
      setAlert({ message: '', isError: false });
    }, delay);

    currentTimeout.current = timeoutId;
  };

  const value = useMemo(
    () => ({
      projects,
      loading,
      alert,
      search,
      currentTimeout,
      currentProject,
      currentCollaborator,
      currentTask,
      modalsStates,
      socket,
      setCurrentProject,
      setCurrentCollaborator,
      setAlert,
      setCurrentTask,
      handleModalsStates,
      handleShowSearch,
      handleAddProject,
      handleDeleteProject,
      handleAddTask,
      handleDeleteTask,
      handleUpdateTask,
      handleResetStates,
      resetAlert,
      submitProject,
      submitTask,
      changeTaskStatus,
      addCollaborator,
      deleteProject,
      deleteTask,
      deleteCollaborator,
      getTask,
      getProject,
      getCollaborator,
    }),
    [
      projects,
      loading,
      alert,
      search,
      currentTimeout,
      currentProject,
      currentCollaborator,
      currentTask,
      modalsStates,
      socket,
      setCurrentProject,
      setCurrentCollaborator,
      setAlert,
      setCurrentTask,
      handleShowSearch,
      handleModalsStates,
      handleAddProject,
      handleDeleteProject,
      handleAddTask,
      handleDeleteTask,
      handleUpdateTask,
      handleResetStates,
      resetAlert,
      submitProject,
      submitTask,
      changeTaskStatus,
      addCollaborator,
      deleteProject,
      deleteTask,
      deleteCollaborator,
      getProject,
      getTask,
      getCollaborator,
    ],
  );

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
