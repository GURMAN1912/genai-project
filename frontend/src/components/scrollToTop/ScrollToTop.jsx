import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top
  }, [pathname]); // Run this effect whenever the route/path changes

  return null; // This component doesn't need to render anything
};

export default ScrollToTop;