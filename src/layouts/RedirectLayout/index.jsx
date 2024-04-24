import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const RedirectLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('lastPath', location.pathname);
  }, [location]);

  useEffect(() => {
    const lastPath = localStorage.getItem('lastPath');
    if (lastPath && lastPath !== location.pathname) {
      navigate(lastPath);
    }
  }, [location, navigate]);

  return <div>{children}</div>;
};
