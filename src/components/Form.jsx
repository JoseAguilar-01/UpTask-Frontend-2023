import { Input } from './Input';
import { Spinner } from './Spinner';

export const Form = props => {
  const {
    inputs,
    buttonSubmitText,
    buttonSubmitDisabled,
    loading,
    onChange,
    onSubmit,
    className,
  } = props;

  return (
    <form className={className} onSubmit={onSubmit}>
      {inputs?.map(input => {
        const { id, label, name, value, type, options, placeholder, disabled } =
          input;

        return (
          <div key={id} className='mb-5'>
            <label
              htmlFor={id}
              className='text-sm font-bold text-gray-700 uppercase'
            >
              {label}
            </label>

            <Input
              id={id}
              name={name}
              type={type}
              options={options}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              onChange={onChange}
              className='block w-full p-2 mt-2 placeholder-gray-400 border-2 rounded-md'
            />
          </div>
        );
      })}

      <button
        type='submit'
        className='w-full p-2 font-bold text-white uppercase transition-colors rounded-md cursor-default bg-sky-600 hover:bg-sky-500'
        disabled={buttonSubmitDisabled || loading}
      >
        {loading ? (
          <Spinner color='white' className='w-6 h-6' />
        ) : (
          buttonSubmitText
        )}
      </button>
    </form>
  );
};
