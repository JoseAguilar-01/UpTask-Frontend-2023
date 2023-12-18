import { Link } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { ModalTaskForm } from '../components/ModalTaskForm';
import { useProject } from '../hooks/useProject';
import { add, add_white, arrow_left, edit, trash } from '../assets/img';
import { Task } from '../components/Task';
import { Collaborator } from '../components/Collaborator';
import { ModalDeleteProject } from '../components/ModalDeleteProject';
import { ModalDeleteTask } from '../components/ModalDeleteTask';
import { ModalDeleteCollaborator } from '../components/ModalDeleteCollaborator';
import { useAdmin } from '../hooks/useAdmin';
import { useProjectView } from '../hooks/useProjectView';

export const Project = () => {
  const { loading, currentProject, id, openTaskModal, openDeleteProjectModal } =
    useProject();

  useProjectView();

  const { isAdmin } = useAdmin();

  return loading ? (
    <Spinner className='my-[100px]' />
  ) : (
    <>
      <div className='flex flex-col items-center gap-5 md:flex-row'>
        <div className='flex items-center gap-5'>
          <Link to={-1} className='pt-[3px]'>
            <img src={arrow_left} className='w-8 h-8' />
          </Link>

          <h1 className='text-4xl font-black'>{currentProject.name}</h1>
        </div>

        {isAdmin && (
          <div className='flex items-center justify-center gap-3'>
            <Link to={`/projects/edit/${id}`} className='pt-2'>
              <img src={edit} className='w-5 h-5' />
            </Link>

            <button onClick={openDeleteProjectModal} className='pt-2'>
              <img src={trash} className='w-5 h-5' />
            </button>
          </div>
        )}
      </div>

      {isAdmin && (
        <button
          className='flex items-center justify-center w-full gap-2 px-5 py-3 mt-5 text-sm font-bold text-white uppercase transition-colors rounded-lg cursor-default md:w-auto bg-sky-600 hover:bg-sky-500'
          onClick={openTaskModal}
        >
          <img src={add_white} alt='add-icon.svg' className='w-6 h-6' />
          Nueva tarea
        </button>
      )}

      <p className='mt-10 text-xl font-bold'>Tareas del proyecto</p>

      <div className='mt-10 bg-white rounded-lg shadow'>
        {currentProject.tasks?.length ? (
          currentProject.tasks.map(task => <Task key={task._id} task={task} />)
        ) : (
          <p className='p-3 font-bold text-center'>Aún no hay tareas</p>
        )}
      </div>

      {isAdmin && (
        <>
          <div className='flex items-center gap-5 mt-5'>
            <p className='text-xl font-bold'>Colaboradores</p>

            <Link to='new-collaborator' className='pb-[2px]'>
              <img src={add} alt='add-icon.svg' className='w-7 h-7 pt-[2px]' />
            </Link>
          </div>

          <div className='mt-10 bg-white rounded-lg shadow'>
            {currentProject.collaborators?.length ? (
              currentProject.collaborators.map(collaborator => (
                <Collaborator
                  key={collaborator._id}
                  collaborator={collaborator}
                />
              ))
            ) : (
              <p className='p-3 font-bold text-center'>
                Aún no hay colaboradores
              </p>
            )}
          </div>
        </>
      )}

      <ModalTaskForm />

      <ModalDeleteProject />
      <ModalDeleteTask />
      <ModalDeleteCollaborator />
    </>
  );
};
