import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Alert } from '../components/Alert';

export const Login = () => {
  const {
    alertData,
    loginFormData,
    authData,
    enableVerification,
    setEnableVerification,
    handleLoginChange,
    handleLoginSubmit,
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (authData._id) {
      navigate('/projects');
    }
  }, [authData]);

  useEffect(() => {
    if (enableVerification) {
      setEnableVerification(false);
      navigate('/confirm-account');
    }
  }, [enableVerification]);

  return (
    <>
      <h1 className='text-6xl font-black capitalize text-sky-600'>
        Inicia sesión y administra tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      {alertData.message && <Alert {...alertData} />}

      <form
        className='p-10 my-10 bg-white rounded-lg shadow'
        onSubmit={handleLoginSubmit}
      >
        <div className='mb-5'>
          <label
            className='block text-xl font-bold text-gray-600 uppercase'
            htmlFor='email'
          >
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            value={loginFormData.email}
            onChange={handleLoginChange}
            placeholder='Email de registro'
            className='w-full p-2 mt-3 border rounded-lg bg-gray-50'
          />
        </div>
        <div className='mb-5'>
          <label
            className='block text-xl font-bold text-gray-600 uppercase'
            htmlFor='password'
          >
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            value={loginFormData.password}
            onChange={handleLoginChange}
            placeholder='Password de registro'
            className='w-full p-2 mt-3 border rounded-lg bg-gray-50'
          />
        </div>

        <input
          type='submit'
          value='Iniciar Sesión'
          className='w-full py-3 font-bold text-white uppercase transition-colors rounded bg-sky-700 hover:bg-sky-800'
        />
      </form>

      <div className='lg:flex lg:justify-between'>
        <Link
          className='block mb-5 text-sm font-semibold text-center uppercase lg:my-0 text-slate-500'
          to='/register'
        >
          ¿No tienes una cuenta? Regístrate
        </Link>

        <Link
          className='block text-sm font-semibold text-center uppercase text-slate-500'
          to='/forgot-password'
        >
          Olvidé mi contraseña
        </Link>
      </div>
    </>
  );
};
