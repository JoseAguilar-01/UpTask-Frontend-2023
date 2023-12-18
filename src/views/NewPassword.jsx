import { useNewPassword } from '../hooks/useNewPassword';
import { Alert } from '../components/Alert';

export const NewPassword = () => {
  const { alertData, formData, isValidToken, handleChange, handleSubmit } =
    useNewPassword();

  return (
    <>
      <h1 className='text-6xl font-black capitalize text-sky-600'>
        Reestablece tu password y no dejes de administrar tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      {alertData.message && <Alert {...alertData} />}

      {isValidToken && (
        <form
          className='p-10 my-10 bg-white rounded-lg shadow'
          onSubmit={handleSubmit}
        >
          <div className='mb-5'>
            <label
              className='block text-xl font-bold text-gray-600 uppercase'
              htmlFor='password'
            >
              Nuevo Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Nuevo password'
              className='w-full p-2 mt-3 border rounded-lg bg-gray-50'
            />
          </div>

          <div className='mb-5'>
            <label
              className='block text-xl font-bold text-gray-600 uppercase'
              htmlFor='password'
            >
              Repetir Password
            </label>
            <input
              id='repeat-password'
              name='repeatPassword'
              type='password'
              value={formData.repeatPassword}
              onChange={handleChange}
              placeholder='Repite tu password'
              className='w-full p-2 mt-3 border rounded-lg bg-gray-50'
            />
          </div>

          <input
            type='submit'
            value='Reestablecer password'
            className='w-full py-3 font-bold text-white uppercase transition-colors rounded bg-sky-700 hover:bg-sky-800'
          />
        </form>
      )}
    </>
  );
};
