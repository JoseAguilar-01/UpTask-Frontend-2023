import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Form } from './Form';
import { Alert } from './Alert';
import { useModalTaskForm } from '../hooks/useModalTaskForm';
import { close_filled } from '../assets/img';

export const ModalTaskForm = () => {
  const {
    isOpen,
    inputsData,
    currentTask,
    alert,
    handleChange,
    handleSubmit,
    closeModal,
  } = useModalTaskForm();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={closeModal}
      >
        <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block w-full px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:p-6'>
              <div className='absolute top-0 right-0 pt-4 pr-4'>
                <button
                  type='button'
                  className='rounded-md hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-sky-500'
                  onClick={closeModal}
                >
                  <img src={close_filled} className='w-6 h-6' />
                </button>
              </div>
              <div className='sm:flex sm:items-start'>
                <div className='w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <Dialog.Title
                    as='h3'
                    className='mb-5 text-xl font-bold leading-6 text-gray-900'
                  >
                    {currentTask._id ? 'Editar Tarea' : 'Nueva Tarea'}
                  </Dialog.Title>

                  {alert.message && <Alert {...alert} />}

                  <Form
                    inputs={inputsData}
                    buttonSubmitText={
                      currentTask._id ? 'Actualizar Tarea' : 'Crear Tarea'
                    }
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
