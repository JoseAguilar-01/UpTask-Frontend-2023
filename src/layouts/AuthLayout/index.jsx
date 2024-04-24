import { Outlet } from 'react-router-dom';
import { RedirectLayout } from '../RedirectLayout';

export const AuthLayout = () => {
  return (
    <RedirectLayout>
      <main className='container p-5 mx-auto mt-5 md:mt-20 md:flex md:justify-center'>
        <div className='md:w-2/3 lg:w-2/5'>
          <Outlet />
        </div>
      </main>
    </RedirectLayout>
  );
};
