import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { ProtectedRoute } from './layouts/ProtectedRoute';
import { Login } from './views/Login';
import { Register } from './views/Register';
import { ForgotPassword } from './views/ForgotPassword';
import { NewPassword } from './views/NewPassword';
import { ConfirmAccount } from './views/ConfirmAccount';
import { AuthProvider } from './context/AuthContext';
import { Projects } from './views/Projects';
import { NewProject } from './views/NewProject';
import { ProjectsProvider } from './context/ProjectsContext';
import { Project } from './views/Project';
import { NewCollaborator } from './views/NewCollaborator';
import { EditProject } from './views/EditProject';
import './index.css';

const element = document.getElementById('root');
const root = createRoot(element);

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'forgot-password/:token',
        element: <NewPassword />,
      },
      {
        path: 'confirm-account',
        element: <ConfirmAccount />,
      },
    ],
  },
  {
    path: '/projects',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Projects />,
      },
      {
        path: 'create',
        element: <NewProject />,
      },
      {
        path: ':id',
        element: <Project />,
      },
      {
        path: 'edit/:id',
        element: <EditProject />,
      },
      {
        path: ':id/new-collaborator',
        element: <NewCollaborator />,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <AuthProvider>
      <ProjectsProvider>
        <RouterProvider router={router} />
      </ProjectsProvider>
    </AuthProvider>
  </StrictMode>,
);
