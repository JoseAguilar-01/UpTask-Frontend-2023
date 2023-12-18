import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import useProjects from './useProjects';
import { compareArrays } from '../helpers/compareArrays';

export const useProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    client: '',
    deadline: '',
  });
  const [mode, setMode] = useState('create');

  const {
    alert,
    currentProject,
    loading,
    resetAlert,
    submitProject,
    getProject,
    setAlert,
  } = useProjects();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setMode('edit');

      getProject(id);
    }
  }, []);

  useEffect(() => {
    /**
     * ! Se evalúa:
     * * Si existe el ID de algún proyecto en los parámetros de la url (PARA SABER SI ESTAMES EDITANDO).
     *
     * * Si no existe información en el state del formulario.
     *
     * * Si existe información del proyecto actual en el state del provider.
     *
     * * Si la alerta no se está mostrando (para evitar setear nueva información al state del form en caso de que se haga submit)
     */
    if (id && !formData.name && currentProject._id && !alert.message) {
      const { name, description, client, deadline } = currentProject;

      setFormData({
        name,
        description,
        client,
        deadline: dayjs(deadline).format('YYYY-MM-DD'),
      });
    }
  }, [currentProject]);

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (Object.values(formData).includes('')) {
      setAlert({ message: 'Todos los campos son obligatorios', isError: true });
      resetAlert(5000);

      return;
    }

    let status = false;

    if (mode === 'create') {
      status = await submitProject(formData);
    }

    if (mode === 'edit') {
      const { name, description, client, deadline } = currentProject;

      const existChanges = !compareArrays(Object.values(formData), [
        name,
        description,
        client,
        dayjs(deadline).format('YYYY-MM-DD'),
      ]);

      if (!existChanges) {
        setAlert({
          message: 'Aún no has realizado cambios',
          isError: true,
        });

        resetAlert(5000);

        return;
      }

      status = await submitProject({ ...formData, id });
    }

    if (status) {
      setFormData({
        name: '',
        description: '',
        client: '',
        deadline: '',
      });

      setTimeout(() => {
        navigate(-1);
        resetAlert();
      }, 2000);
    }
  };

  const inputsData = [
    {
      id: 'name',
      name: 'name',
      value: formData.name,
      type: 'text',
      label: 'Nombre',
      placeholder: 'Nombre del proyecto',
    },
    {
      id: 'deadline',
      name: 'deadline',
      value: formData.deadline,
      type: 'date',
      label: 'Fecha de entrega',
    },
    {
      id: 'client',
      name: 'client',
      value: formData.client,
      type: 'text',
      label: 'Cliente',
      placeholder: 'Nombre del cliente',
    },
    {
      id: 'description',
      name: 'description',
      value: formData.description,
      type: 'textarea',
      label: 'Descripción',
      placeholder: 'Descripción del proyecto',
    },
  ];

  return {
    inputsData,
    alert,
    formData,
    currentProject,
    loading,
    handleChange,
    handleSubmit,
  };
};
