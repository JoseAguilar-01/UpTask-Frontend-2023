import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Spinner } from '../../components/Spinner';

export const ProtectedRoute = () => {
  const { authData, loading } = useAuth();

  return loading ? (
    <Spinner className='my-[100px]' />
  ) : authData._id ? (
    <div className='bg-gray-100 '>
      <Header />

      <div className='md:flex md:min-h-screen'>
        <Sidebar />
        <main className='p-5 flex-grozw'>
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <Navigate to='/' />
  );
};
