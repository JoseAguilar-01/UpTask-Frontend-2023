import classNames from 'classnames';
import '../assets/css/Spinner.css';

export const Spinner = props => {
  const { color, className } = props;

  const cubeColor = color === 'white' ? 'sk-cube--white' : 'sk-cube';

  return (
    <div className={classNames('sk-cube-grid', className)}>
      <div className={classNames('sk-cube1', cubeColor)}></div>
      <div className={classNames('sk-cube2', cubeColor)}></div>
      <div className={classNames('sk-cube3', cubeColor)}></div>
      <div className={classNames('sk-cube4', cubeColor)}></div>
      <div className={classNames('sk-cube5', cubeColor)}></div>
      <div className={classNames('sk-cube6', cubeColor)}></div>
      <div className={classNames('sk-cube7', cubeColor)}></div>
      <div className={classNames('sk-cube8', cubeColor)}></div>
      <div className={classNames('sk-cube9', cubeColor)}></div>
    </div>
  );
};
