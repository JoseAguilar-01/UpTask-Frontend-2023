import classNames from 'classnames';

export const Alert = props => {
  const { isError, message, className } = props;

  return (
    <div
      className={classNames(
        isError ? ' from-red-400 to-red-600' : ' from-sky-400 to-sky-600',
        'bg-gradient-to-r text-center rounded-xl p-3 uppercase text-white font-bold text-sm my-10',
        className,
      )}
    >
      {message}
    </div>
  );
};
