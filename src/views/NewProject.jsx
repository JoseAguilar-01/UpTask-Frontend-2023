import { Link } from 'react-router-dom';
import { arrow_left } from '../assets/img';
import { Alert } from '../components/Alert';
import { Form } from '../components/Form';
import { useProjectForm } from '../hooks/useProjectForm';

export const NewProject = () => {
  const { inputsData, alert, handleChange, handleSubmit } = useProjectForm();

  return (
    <>
      <div className='flex items-center gap-5'>
        <Link to={-1} className='pt-[3px]'>
          <img src={arrow_left} className='w-8 h-8' />
        </Link>
        <h1 className='text-4xl font-black'>Crear Proyecto</h1>
      </div>

      <div className='mx-auto lg:w-1/2'>
        {alert.message && <Alert {...alert} />}

        <Form
          inputs={inputsData}
          buttonSubmitText='Crear proyecto'
          onChange={handleChange}
          onSubmit={handleSubmit}
          className='px-5 py-10 my-10 bg-white rounded-lg shadow'
        />
      </div>
    </>
  );
};
