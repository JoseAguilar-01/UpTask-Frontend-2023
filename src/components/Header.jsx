import { Link, useNavigate } from 'react-router-dom';
import { Search } from './Search';
import { useAuth } from '../hooks/useAuth';
import useProjects from '../hooks/useProjects';
import { search } from '../assets/img';

export const Header = () => {
  const { logout } = useAuth();
  const { handleShowSearch, handleResetStates } = useProjects();

  const navigate = useNavigate();

  return (
    <header className='sticky px-4 py-5 bg-white border-b shadow-sm'>
      <div className='flex flex-col justify-center gap-5 sm:flex-row sm:justify-between sm:items-center'>
        <Link
          to={'/projects'}
          className='text-4xl font-black text-center text-sky-600'
        >
          UpTask
        </Link>

        <div className='flex items-center gap-3'>
          <button
            className='flex items-center gap-2 p-2 text-sm font-bold text-white uppercase transition-colors rounded-md cursor-default bg-sky-600 hover:bg-sky-500'
            onClick={handleShowSearch}
          >
            <img src={search} alt='search.svg' height={20} width={20} />
            Buscar Proyecto
          </button>

          <button
            className='p-2 text-sm font-bold text-white uppercase transition-colors bg-red-600 rounded-md cursor-default hover:bg-red-500'
            onClick={() => {
              logout();
              handleResetStates();
              navigate('/');
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      <Search />
    </header>
  );
};
