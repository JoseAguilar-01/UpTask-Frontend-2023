import { Link } from 'react-router-dom';
import { useForgotPassword } from '../hooks/useForgotPassword';
import { Alert } from '../components/Alert';

export const ForgotPassword = () => {
  const {
    alert,
    email,
    token,
    setEmail,
    setToken,
    handleRequestToken,
    handleValidateToken,
  } = useForgotPassword();

  return (
    <>
      <h1 className='text-6xl font-black capitalize text-sky-600'>
        Recupera tu acceso y no pierdas tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      {alert.message && <Alert {...alert} />}

      <div className=''>
        <form
          className='p-10 my-10 bg-white rounded-lg shadow'
          onSubmit={handleRequestToken}
        >
          <div className='mb-5'>
            <label
              className='block text-xl font-bold text-gray-600 uppercase'
              htmlFor='email'
            >
              1º Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              onChange={e => setEmail(e.target.value)}
              value={email}
              placeholder='Email de registro'
              className='w-full p-2 mt-3 border rounded-lg bg-gray-50'
            />
            <p className='mt-2 mb-0 text-gray-500'>
              NOTA: Enviaremos un código de verificación a tu email.
            </p>
          </div>

          <input
            type='submit'
            value='Solicitar código'
            className='w-full py-3 font-bold text-white uppercase transition-colors rounded bg-sky-700 hover:bg-sky-800 disabled:bg-gray-500'
            disabled={!email || email.includes(' ')}
          />
        </form>

        <form
          className='p-10 my-10 bg-white rounded-lg shadow'
          onSubmit={handleValidateToken}
        >
          <div className='mb-5'>
            <label
              className='block text-xl font-bold text-gray-600 uppercase'
              htmlFor='token'
            >
              2º Código de verificación
            </label>
            <input
              id='token'
              name='token'
              type='token'
              onChange={e => setToken(e.target.value)}
              value={token}
              placeholder='Código de verificación'
              className='w-full p-2 mt-3 border rounded-lg bg-gray-50'
            />
            <p className='mt-2 mb-0 text-gray-500'>
              NOTA: Copia el código de verificación que hemos enviado a tu
              email, y pégalo aquí.
            </p>
          </div>

          <input
            type='submit'
            value='Validar código'
            className='w-full py-3 font-bold text-white uppercase transition-colors rounded bg-sky-700 hover:bg-sky-800 disabled:bg-gray-500'
            disabled={!token || token.includes(' ')}
          />
        </form>
      </div>

      <div className='lg:flex lg:justify-between lg:gap-5'>
        <Link
          className='block mb-5 text-sm font-semibold text-center uppercase lg:my-0 text-slate-500'
          to='/register'
        >
          ¿No tienes una cuenta? Regístrate
        </Link>

        <Link
          className='block text-sm font-semibold text-center uppercase text-slate-500'
          to='/'
        >
          ¿Recuerdas tu contraseña? Inicia sesión
        </Link>
      </div>
    </>
  );
};
