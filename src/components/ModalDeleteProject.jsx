import { ModalConfirm } from './ModalConfirm';
import { useProject } from '../hooks/useProject';

export const ModalDeleteProject = () => {
  const { modalsStates, handleModalsStates, handleDeleteProject } =
    useProject();

  return (
    <ModalConfirm
      isOpen={modalsStates.modalDeleteProject}
      setIsOpen={value => handleModalsStates('modalDeleteProject', value)}
      title='¿Estás seguro de eliminar este proyecto?'
      content='Un proyecto eliminado no se puede recuperar.'
      type='delete'
      onConfirm={handleDeleteProject}
    />
  );
};
