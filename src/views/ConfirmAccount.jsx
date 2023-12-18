import { Link } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { useConfirmAccount } from '../hooks/useConfirmAccount';

export const ConfirmAccount = () => {
  const { alertData, confirmedUser } = useConfirmAccount();

  return (
    <>
      <h1 className='text-6xl font-black capitalize text-sky-600'>
        Confirma tu cuenta y comienza a crear tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      <div className='px-5 py-10 mt-20 bg-white shadow-lg md:mt-10 rounded-xl'>
        {alertData.message && <Alert {...alertData} />}

        {confirmedUser && (
          <Link
            className='block mx-auto text-sm font-semibold text-center uppercase text-slate-500'
            to='/'
          >
            Inicia sesión
          </Link>
        )}
      </div>
    </>
  );
};
