import { ModalConfirm } from './ModalConfirm';
import { useProject } from '../hooks/useProject';

export const ModalDeleteTask = () => {
  const { modalsStates, handleModalsStates, handleDeleteTask } = useProject();

  return (
    <ModalConfirm
      isOpen={modalsStates.modalDeleteTask}
      setIsOpen={value => handleModalsStates('modalDeleteTask', value)}
      title='¿Estás seguro de eliminar esta tarea?'
      content='Una tarea eliminada no se puede recuperar.'
      type='delete'
      onConfirm={handleDeleteTask}
    />
  );
};
