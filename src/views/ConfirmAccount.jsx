import { Link } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { useConfirmAccount } from '../hooks/useConfirmAccount';

export const ConfirmAccount = () => {
  const {
    alertData,
    confirmedUser,
    confirmFormData,
    handleChange,
    confirmAccount,
  } = useConfirmAccount();

  return (
    <>
      <h1 className='text-6xl font-black capitalize text-sky-600'>
        Confirma tu cuenta y comienza a crear tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      <form
        className='p-10 my-10 bg-white rounded-lg shadow'
        onSubmit={confirmAccount}
      >
        <div className='mb-5'>
          <label
            className='block text-xl font-bold text-gray-600 uppercase'
            htmlFor='token'
          >
            Código
          </label>
          <input
            id='token'
            name='token'
            type='token'
            value={confirmFormData.token}
            onChange={handleChange}
            placeholder='Código de verificación'
            className='w-full p-2 mt-3 border rounded-lg bg-gray-50'
          />
          <div className='mt-2 text-gray-500'>
            NOTA: Copia el código de verificación que hemos enviado a tu email,
            y pégalo aquí.
          </div>
        </div>

        <input
          type='submit'
          value='Confirmar Cuenta'
          className='w-full py-3 font-bold text-white uppercase transition-all rounded bg-sky-700 hover:bg-sky-800 disabled:bg-gray-500'
          disabled={!confirmFormData.token}
        />
      </form>

      {(alertData.message || confirmedUser) && (
        <div className='px-5 py-10 mt-20 bg-white shadow-lg md:mt-10 rounded-xl'>
          {confirmedUser && (
            <Link
              className='block mx-auto text-sm font-semibold text-center uppercase text-sky-600'
              to='/'
            >
              Inicia sesión
            </Link>
          )}

          {alertData.message && <Alert {...alertData} />}
        </div>
      )}
    </>
  );
};
