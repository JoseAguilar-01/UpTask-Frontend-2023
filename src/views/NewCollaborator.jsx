import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { arrow_left } from '../assets/img';
import { Alert } from '../components/Alert';
import { Form } from '../components/Form';
import { useNewCollaborator } from '../hooks/useNewCollaborator';

export const NewCollaborator = () => {
  const {
    alert,
    loading,
    inputsData,
    currentProject,
    currentCollaborator,
    collaboratorIsAdded,
    handleAddCollaborator,
    handleChange,
    handleSubmit,
  } = useNewCollaborator();

  return !loading && !currentProject._id ? (
    <Alert {...alert} />
  ) : (
    <>
      <div className='flex items-center gap-5'>
        <Link to={-1} className='pt-[3px]'>
          <img src={arrow_left} className='w-8 h-8' />
        </Link>

        <h1 className='text-4xl font-black'>
          Añadir nuevo colaborador(a) al proyecto: {currentProject.name}
        </h1>
      </div>

      <div className='max-w-lg px-5 py-10 mx-auto my-10 bg-white rounded-lg shadow md:w-1/2'>
        {alert.message && <Alert {...alert} />}

        <Form
          inputs={inputsData}
          buttonSubmitText='Buscar Colaborador'
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>

      {!loading && currentCollaborator?._id && (
        <div className='flex flex-col gap-5 px-5 py-10 mx-auto mt-10 bg-white rounded-lg shadow md:w-1/2'>
          <h2 className='text-2xl font-bold text-center'>Resultado:</h2>

          <ul>
            <li>
              <span className='font-bold'>Nombre:</span>{' '}
              {currentCollaborator.name}
            </li>

            <li>
              <span className='font-bold'>Email:</span>{' '}
              {currentCollaborator.email}
            </li>

            <li>
              <span className='font-bold'>Agregado como colaborador:</span>{' '}
              {collaboratorIsAdded ? 'Sí' : 'No'}
            </li>
          </ul>

          <button
            className={classNames(
              collaboratorIsAdded
                ? 'bg-gray-500'
                : 'bg-sky-600 hover:bg-sky-500',
              'w-full p-2 font-bold text-white uppercase transition-colors rounded-md cursor-default ',
            )}
            disabled={collaboratorIsAdded}
            onClick={handleAddCollaborator}
          >
            Agregar colaborador
          </button>
        </div>
      )}
    </>
  );
};
