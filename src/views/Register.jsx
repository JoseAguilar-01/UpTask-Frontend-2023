import { Link } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { useRegister } from '../hooks/useRegister';

export const Register = () => {
  const { formData, alertData, handleChange, handleSubmit } = useRegister();

  return (
    <>
      <h1 className='text-6xl font-black text-center capitalize text-sky-600'>
        Crea tu cuenta y administra tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      {alertData.message && <Alert {...alertData} />}

      <form
        className='p-10 my-10 bg-white rounded-lg shadow'
        onSubmit={handleSubmit}
      >
        <div className='mb-5'>
          <label
            className='block text-xl font-bold text-gray-600 uppercase'
            htmlFor='name'
          >
            Nombre
          </label>
          <input
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            type='text'
            placeholder='Tu nombre'
            className='w-full p-2 mt-3 border rounded-lg bg-gray-50'
          />
        </div>

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
            value={formData.email}
            onChange={handleChange}
            type='email'
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
            value={formData.password}
            onChange={handleChange}
            type='password'
            placeholder='Password de registro'
            className='w-full p-2 mt-3 border rounded-lg bg-gray-50'
          />
        </div>

        <div className='mb-5'>
          <label
            className='block text-xl font-bold text-gray-600 uppercase'
            htmlFor='repeat-password'
          >
            Repetir Password
          </label>
          <input
            id='repeat-password'
            name='repeatPassword'
            value={formData.repeatPassword}
            onChange={handleChange}
            type='password'
            placeholder='Repite tu password'
            className='w-full p-2 mt-3 border rounded-lg bg-gray-50'
          />
        </div>

        <button
          type='submit'
          className='w-full py-3 font-bold text-white uppercase transition-colors rounded cursor-default bg-sky-700 hover:bg-sky-800'
        >
          Crear cuenta
        </button>
      </form>

      <Link
        className='block mx-auto text-sm font-semibold text-center uppercase text-slate-500'
        to='/'
      >
        ¿Tienes una cuenta? Inicia sesión
      </Link>
    </>
  );
};
