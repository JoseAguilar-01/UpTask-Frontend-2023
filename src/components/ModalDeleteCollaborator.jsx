import { ModalConfirm } from './ModalConfirm';
import { useProject } from '../hooks/useProject';

export const ModalDeleteCollaborator = () => {
  const { modalsStates, handleModalsStates, handleDeleteCollaborator } =
    useProject();

  return (
    <ModalConfirm
      isOpen={modalsStates.modalDeleteCollaborator}
      setIsOpen={value => handleModalsStates('modalDeleteCollaborator', value)}
      title='¿Estás seguro de eliminar este colaborador?'
      content='Un colaborador eliminado no podrá acceder al proyecto de nuevo.'
      type='delete'
      onConfirm={handleDeleteCollaborator}
    />
  );
};
