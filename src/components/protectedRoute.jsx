import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { getUserDetails } from '../apiCalls/users'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/users'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const activeRoute = window.location.pathname;

  const userMenu = [
    {
      title: 'Home',
      paths: ['/home'],
      icon: <i className="ri-home-8-line" style={{fontSize: '24px'}}></i>,
      onClick: () => navigate('/home')
    },
    {
      title: 'Reports',
      paths: ['/user/reports'],
      icon: <i className="ri-file-text-line" style={{fontSize: '24px'}}></i>,
      onClick: () => navigate('/user/reports')
    },
    {
      title: 'Profile',
      paths: ['/profile'],
      icon: <i className="ri-user-line" style={{fontSize: '24px'}}></i>,
      onClick: () => navigate('/profile')
    },
    {
      title: 'Logout',
      paths: ['/logout'],
      icon: <i className="ri-logout-box-line" style={{fontSize: '24px'}}></i>,
      onClick: () => {
        sessionStorage.removeItem('token');
        navigate('/login');
      }
    }
  ];

  const adminMenu = [
    {
      title: 'Home',
      paths: ['/home'],
      icon: <i className="ri-home-8-line" style={{fontSize: '24px'}}></i>,
      onClick: () => navigate('/home')
    },
    {
      title: 'Exams',
      paths: ['/admin/exams', '/admin/exams/add', '/admin/exams/:id'],
      icon: <i class="ri-file-list-line" style={{fontSize: '24px'}}></i>,
      onClick: () => navigate('/admin/exams')
    },
    {
      title: 'Reports',
      paths: ['/admin/reports'],
      icon: <i className="ri-file-text-line" style={{fontSize: '24px'}}></i>,
      onClick: () => navigate('/admin/reports')
    },
    {
      title: 'Profile',
      paths: ['/admin/profile'],
      icon: <i className="ri-user-line" style={{fontSize: '24px'}}></i>,
      onClick: () => navigate('/admin/profile')
    },
    {
      title: 'Logout',
      paths: ['/logout'],
      icon: <i className="ri-logout-box-line" style={{fontSize: '24px'}}></i>,
      onClick: () => {
        sessionStorage.removeItem('token');
        navigate('/login');
      }
    }
  ];

  const fetchUserDetails = async () => {
    try {
      toast.loading('Fetching user details...');
      const response = await getUserDetails();
      if (response.success) {
        console.log(response?.data);
        dispatch(setUser(response?.data));
        if (response?.data?.isAdmin) {
          setMenu(adminMenu);
        } else {
          setMenu(userMenu);
        }
        toast.dismiss();
        toast.success(response.message);
      } else {
        toast.dismiss();
        toast.error(response?.message);
        navigate('/login');
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
      navigate('/login');
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    if (!user?.user?.name || user?.name) {
      fetchUserDetails();
    }

    // Set menu based on user role
    if (user?.user?.isAdmin) {
      setMenu(adminMenu);
    } else {
      setMenu(userMenu);
    }
  }, [user?.user?.isAdmin]); 

  const getIsActive = (paths) => {
    console.log(paths);
    console.log(paths.some(path => activeRoute.includes(path)));
    return paths.some(path => activeRoute.includes(path));
  }

  return (
    <div className='layout'>
      <div className='flex gap-2 h-full h-100'>
          <div className='sidebar'>
            <div className="menu">
            {menu.map((item, index) => {
              return (
                <div 
                  className={`menu-item ${getIsActive(item.paths) ? 'active' : ''}`} 
                  key={index}
                  onClick={item.onClick}
                >
                  {item.icon}
                  {collapsed && (
                    <span>{item.title}</span>)}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className='body'>
          <div className='header flex justify-between items-center'>
           {collapsed ? <i className="ri-close-circle-line" style={{fontSize: '24px'}} onClick={() => setCollapsed(!collapsed)}></i> : <i className="ri-menu-2-line" style={{fontSize: '24px'}} onClick={() => setCollapsed(!collapsed)}></i>}
            <h1 className='text-2xl font-bold'>Quiz App</h1>
            <div className='flex items-center gap-1'>
              <i className="ri-user-2-fill" style={{fontSize: '24px'}}></i>
              <h1 className='text-lg underline'>{user?.name || user?.user?.name}</h1>
            </div>
          </div>
          <div className='content'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtectedRoute;
