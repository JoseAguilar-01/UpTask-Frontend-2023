import { Link } from 'react-router-dom';
import { add } from '../assets/img';
import { Spinner } from '../components/Spinner';
import { ProjectPreview } from '../components/ProjectPreview';
import { Alert } from '../components/Alert';
import { useProjectsView } from '../hooks/useProjectsView';
import useProjects from '../hooks/useProjects';

export const Projects = () => {
  const { projects, loading, alert } = useProjects();

  useProjectsView();

  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className='flex items-end gap-5'>
        <h1 className='text-4xl font-black'>Proyectos</h1>

        <Link to='create' className='pb-[2px]'>
          <img src={add} alt='add-icon.svg' className='w-7 h-7 pt-[2px]' />
        </Link>
      </div>

      {alert.message && <Alert {...alert} />}

      <div className='mt-10 bg-white rounded-lg shadow'>
        {!projects.length ? (
          <p className='p-5 font-semibold text-center text-gray-600 uppercase '>
            No hay proyectos aún
          </p>
        ) : (
          projects.map(project => (
            <ProjectPreview key={project._id} project={project} />
          ))
        )}
      </div>
    </>
  );
};
