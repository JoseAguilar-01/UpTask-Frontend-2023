import { Link } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';
import useProjects from '../hooks/useProjects';

export const ProjectPreview = props => {
  const { project } = props;

  const { name, client, _id } = project;

  const { setCurrentProject } = useProjects();

  const { isAdmin } = useAdmin(project);

  return (
    <div className='flex justify-between gap-5 p-5 border-b'>
      <div className='flex items-center gap-2'>
        <p className='flex-1 font-semibold'>
          {name}{' '}
          <span className='text-sm text-gray-500 uppercase'>({client})</span>
        </p>

        {!isAdmin && (
          <p className='p-1 text-xs font-bold text-white uppercase bg-green-500 rounded-lg'>
            Colaborador
          </p>
        )}
      </div>

      <Link
        to={_id}
        onClick={() => setCurrentProject({})}
        className='text-sm font-bold text-gray-600 uppercase transition-colors hover:text-gray-800'
      >
        Ver proyecto
      </Link>
    </div>
  );
};
