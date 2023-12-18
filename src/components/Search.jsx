import { Fragment, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useNavigate, useLocation } from 'react-router-dom';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import useProjects from '../hooks/useProjects';

export const Search = () => {
  const [valueToSearch, setValueToSearch] = useState('');

  const { handleShowSearch, search, projects } = useProjects();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleResetSearch = () => {
    setValueToSearch('');
  };

  const filteredProjects = useMemo(() => {
    if (!valueToSearch) return [];

    const filteredProjects = projects.filter(project =>
      project.name.toLowerCase().includes(valueToSearch.toLowerCase()),
    );

    return filteredProjects;
  }, [valueToSearch]);

  return (
    <Transition.Root show={search} as={Fragment} afterLeave={handleResetSearch}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 p-4 mt-20 overflow-y-auto sm:p-20 md:p-20'
        onClose={handleShowSearch}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-25' />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Combobox
            as='div'
            className='max-w-xl mx-auto overflow-hidden transition-all transform bg-white divide-y divide-gray-100 shadow-2xl rounded-xl ring-1 ring-black ring-opacity-5'
            onChange={project => {
              const url = `/projects/${project._id}`;

              if (!pathname.includes(url)) {
                navigate(url);
                window.location.reload();
              }

              handleShowSearch();
            }}
          >
            <div className='relative'>
              <Combobox.Input
                className='w-full h-12 pr-4 text-gray-800 placeholder-gray-400 bg-transparent border-0 outline-none pl-11 sm:text-sm'
                placeholder='Buscar...'
                onChange={e => setValueToSearch(e.target.value)}
              />
            </div>

            {filteredProjects.length > 0 && (
              <Combobox.Options
                static
                className='py-2 overflow-y-auto text-sm text-gray-800 max-h-72 scroll-py-2'
              >
                {filteredProjects.map(project => (
                  <Combobox.Option
                    key={project._id}
                    value={project}
                    className={({ active }) =>
                      classNames(
                        'cursor-default select-none px-4 p-2',
                        active && 'bg-sky-600 text-white',
                      )
                    }
                  >
                    {project.name}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};
