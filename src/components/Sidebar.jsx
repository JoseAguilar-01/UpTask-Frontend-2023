import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Sidebar = () => {
  const { authData } = useAuth();

  const items = [
    {
      path: '/projects',
      label: 'Proyectos',
    },
  ];

  return (
    <aside className='p-5 bg-white border-r shadow-sm md:min-w-[20rem]'>
      <p className='text-xl font-bold'>Hola: {authData.name}</p>

      <ul>
        {items.map(item => {
          const { path, label } = item;

          return (
            <li key={crypto.randomUUID()}>
              <Link
                to={path}
                className='block w-full p-2 mt-5 font-bold text-center text-white uppercase transition-colors rounded-md bg-sky-600 hover:bg-sky-500'
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
