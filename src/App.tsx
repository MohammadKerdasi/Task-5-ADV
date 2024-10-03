import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SideBar from './Components/SideBar';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  profile_image_url: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  return (
    <div className='flex flex-row'>
      <SideBar user={user} />
      <Outlet />
    </div>
  );
};

export default App;