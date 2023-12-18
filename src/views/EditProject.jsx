import { Link } from 'react-router-dom';
import { useProjectForm } from '../hooks/useProjectForm';
import { Form } from '../components/Form';
import { Alert } from '../components/Alert';
import { arrow_left } from '../assets/img';

export const EditProject = () => {
  const {
    inputsData,
    alert,
    loading,
    currentProject,
    handleChange,
    handleSubmit,
  } = useProjectForm();

  return (
    <>
      <div className='flex items-center gap-5'>
        <Link to={-1} className='pt-[3px]'>
          <img src={arrow_left} className='w-8 h-8 ' />
        </Link>
        <h1 className='text-4xl font-black'>
          Editar Proyecto: {currentProject.name}
        </h1>
      </div>

      <div className='p-5 mx-auto mt-10 bg-white rounded-lg shadow lg:w-1/2'>
        {alert.message && <Alert {...alert} />}

        <Form
          inputs={inputsData}
          buttonSubmitText='Guardar cambios'
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </>
  );
};
