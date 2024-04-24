import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Spinner } from '../../components/Spinner';
import { RedirectLayout } from '../RedirectLayout';

export const ProtectedRoute = () => {
  const { authData, loading } = useAuth();

  return (
    <RedirectLayout>
      {loading ? (
        <Spinner className='my-[100px]' />
      ) : authData._id ? (
        <div className='bg-gray-100 '>
          <Header />

          <div className='md:flex md:min-h-screen'>
            <Sidebar />
            <main className='flex-grow p-5'>
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to='/' />
      )}
    </RedirectLayout>
  );
};
