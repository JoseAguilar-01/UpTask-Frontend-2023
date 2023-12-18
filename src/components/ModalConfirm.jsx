import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { close_filled, exclamation } from '../assets/img';

export const ModalConfirm = props => {
  const { title, content, type, isOpen, setIsOpen, onConfirm } = props;

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    onConfirm?.();

    closeModal();
  };

  const icons = {
    error: (
      <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10'>
        <img src={exclamation} alt='exclamation-icon.svg' className='w-6 h-6' />
      </div>
    ),
  };

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
            <div className='inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
              <div className='absolute top-0 right-0 hidden pt-4 pr-4 sm:block'>
                <button
                  type='button'
                  className='rounded-md hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-sky-500'
                  onClick={closeModal}
                >
                  <img src={close_filled} className='w-6 h-6' />
                </button>
              </div>

              <div className='sm:flex sm:items-start'>
                {type === 'delete' && icons.error}

                <div className='w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <Dialog.Title
                    as='h3'
                    className='flex text-xl font-bold leading-6 text-gray-900'
                  >
                    {title}
                  </Dialog.Title>

                  <p className='mt-2 text-sm text-gray-500'>{content}</p>

                  <div className='flex flex-col gap-3 mt-5 sm:gap-2 sm:mt-4 sm:flex-row'>
                    <button
                      onClick={closeModal}
                      className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 sm:mt-0 sm:w-auto sm:text-sm'
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleConfirm}
                      className={classNames(
                        type === 'delete'
                          ? 'bg-red-600 hover:bg-red-700 '
                          : 'bg-sky-600 hover:bg-sky-700 ',
                        'inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white  border border-transparent rounded-md shadow-sm sm:ml-3 sm:w-auto sm:text-sm transition-colors',
                      )}
                    >
                      {type === 'delete' ? 'Eliminar' : 'Confirmar'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
