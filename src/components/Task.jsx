import classNames from 'classnames';
import { Spinner } from './Spinner';
import { useTask } from '../hooks/useTask';
import { useAdmin } from '../hooks/useAdmin';
import { formatDate } from '../helpers/formatDate';

export const Task = props => {
  const { name, description, status, priority, deadline, completed } =
    props.task;

  const { loadingStates, openDeleteModal, handleUpdateState, openModalForm } =
    useTask(props);

  const { isAdmin } = useAdmin();

  return (
    <div className='flex items-center justify-between gap-5 p-5 border-b'>
      <div className='flex flex-col items-start gap-1'>
        <p className='text-xl font-bold'>{name}</p>
        <p className='text-sm text-gray-500 uppercase'>{description}</p>
        <p className='text-sm font-semibold text-gray-600'>
          Fecha límite: {formatDate(deadline).formattedDate}
        </p>
        <p className='text-sm font-semibold text-gray-600'>
          Prioridad: {priority}
        </p>
        {status && (
          <p className='p-1 text-xs font-semibold text-white uppercase bg-green-600 rounded-lg'>
            Completado por: {completed.name}
          </p>
        )}
      </div>

      <div className='flex flex-col gap-3 lg:flex-row'>
        {isAdmin && (
          <button
            className='px-3 py-2 text-sm font-bold text-white uppercase transition-colors bg-indigo-600 rounded-lg cursor-default hover:bg-indigo-500'
            onClick={openModalForm}
          >
            Editar
          </button>
        )}

        <button
          className={classNames(
            status
              ? 'bg-sky-600 hover:enabled:bg-sky-500'
              : 'bg-gray-600 hover:enabled:bg-gray-500',
            'px-3 py-2 text-sm font-bold text-white uppercase  rounded-lg cursor-default transition-colors min-w-[113px]',
          )}
          onClick={handleUpdateState}
          disabled={loadingStates.updateState}
        >
          {loadingStates.updateState ? (
            <Spinner className='w-5 h-5 ' color='white' />
          ) : status ? (
            'Completa'
          ) : (
            'Incompleta'
          )}
        </button>

        {isAdmin && (
          <button
            className='px-3 py-2 text-sm font-bold text-white uppercase transition-colors bg-red-600 rounded-lg cursor-default hover:bg-red-500'
            onClick={openDeleteModal}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
