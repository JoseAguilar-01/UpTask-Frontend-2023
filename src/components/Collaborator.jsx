import { useCollaborator } from '../hooks/useCollaborator';

export const Collaborator = props => {
  const { collaborator } = props;

  const { name, email } = collaborator;

  const { openDeleteModal } = useCollaborator(props);

  return (
    <div className='flex items-center justify-between gap-5 p-5 border-b'>
      <div>
        <p className='mb-1 text-xl font-bold'> {name}</p>
        <p className='text-sm text-gray-700'> {email}</p>
      </div>

      <button
        className='px-3 py-2 text-sm font-bold text-white uppercase transition-colors bg-red-600 rounded-lg cursor-default hover:bg-red-500'
        onClick={openDeleteModal}
      >
        Eliminar
      </button>
    </div>
  );
};
