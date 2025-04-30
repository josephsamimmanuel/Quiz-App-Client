import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { getUserDetails } from '../apiCalls/users'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/users'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { APP_NAME, ROUTES } from '../utils/constants'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

function ProtectedRoute() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const activeRoute = window.location.pathname;

  const userMenu = [
    {
      title: t('QUESTION_MODEL.MENU.HOME'),
      paths: [ROUTES.PROTECTED.USER.HOME],
      icon: <i className="ri-home-8-line" style={{fontSize: '24px'}}></i>,
      onClick: () => navigate(ROUTES.PROTECTED.USER.HOME)
    },
    {
      title: t('QUESTION_MODEL.MENU.REPORTS'),
      paths: [ROUTES.PROTECTED.USER.REPORTS],
      icon: <i className="ri-file-text-line" style={{fontSize: '24px'}}></i>,
      onClick: () => navigate(ROUTES.PROTECTED.USER.REPORTS)
    },
    {
      title: t('QUESTION_MODEL.MENU.PROFILE'),
      paths: [ROUTES.PROTECTED.USER.PROFILE],
      icon: <i className="ri-user-line" style={{fontSize: '24px'}}></i>,
      onClick: () => navigate(ROUTES.PROTECTED.USER.PROFILE)
    },
    {
      title: t('QUESTION_MODEL.MENU.LOGOUT'),
      paths: [ROUTES.COMMON.LOGOUT],
      icon: <i className="ri-logout-box-line" style={{fontSize: '24px'}}></i>,
      onClick: () => {
        sessionStorage.removeItem('token');
        navigate(ROUTES.COMMON.LOGIN);
      }
    }
  ];

  const adminMenu = [
    {
      title: t('QUESTION_MODEL.MENU.HOME'),
      paths: [ROUTES.PROTECTED.USER.HOME],
      icon: <i className="ri-home-8-line" style={{fontSize: '24px'}}></i>,
      onClick: () => navigate(ROUTES.PROTECTED.USER.HOME)
    },
    {
      title: t('QUESTION_MODEL.MENU.EXAMS'),
      paths: [ROUTES.PROTECTED.ADMIN.EXAMS, ROUTES.PROTECTED.ADMIN.ADD_EXAM, ROUTES.PROTECTED.ADMIN.EDIT_EXAM],
      icon: <i className="ri-file-list-line" style={{fontSize: '24px'}}></i>,
      onClick: () => navigate(ROUTES.PROTECTED.ADMIN.EXAMS)
    },
    {
      title: t('QUESTION_MODEL.MENU.REPORTS'),
      paths: [ROUTES.PROTECTED.ADMIN.REPORTS],
      icon: <i className="ri-file-text-line" style={{fontSize: '24px'}}></i>,
      onClick: () => navigate(ROUTES.PROTECTED.ADMIN.REPORTS)
    },
    {
      title: t('QUESTION_MODEL.MENU.PROFILE'),
      paths: [ROUTES.PROTECTED.ADMIN.PROFILE],
      icon: <i className="ri-user-line" style={{fontSize: '24px'}}></i>,
      onClick: () => navigate(ROUTES.PROTECTED.ADMIN.PROFILE)
    },
    {
      title: t('QUESTION_MODEL.MENU.LOGOUT'),
      paths: [ROUTES.COMMON.LOGOUT],
      icon: <i className="ri-logout-box-line" style={{fontSize: '24px'}}></i>,
      onClick: () => {
        sessionStorage.removeItem('token');
        navigate(ROUTES.COMMON.LOGIN);
      }
    }
  ];

  const fetchUserDetails = async () => {
    try {
      toast.loading(t('TOAST_MESSAGES.LOADING'));
      const response = await getUserDetails();
      if (response.success) {
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
        navigate(ROUTES.COMMON.LOGIN);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
      navigate(ROUTES.COMMON.LOGIN);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate(ROUTES.COMMON.LOGIN);
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
  }, [user?.user?.isAdmin, t]); 

  const getIsActive = (paths) => {
    return paths.some(path => activeRoute.includes(path));
  }

  return (
    <div className='layout'>
      <div className='flex gap-2 h-full h-100'>
        <div className='sidebar'>
          <div className="menu">
            {menu.map((item, index) => (
              <div 
                className={`menu-item ${getIsActive(item.paths) ? 'active' : ''}`} 
                key={index}
                onClick={item.onClick}
              >
                {item.icon}
                {collapsed && <span>{item.title}</span>}
              </div>
            ))}
          </div>
        </div>
        
        <div className='body'>
          <div className='header flex justify-between items-center'>
            {collapsed ? 
              <i className="ri-close-circle-line" style={{fontSize: '24px'}} onClick={() => setCollapsed(!collapsed)}></i> : 
              <i className="ri-menu-2-line" style={{fontSize: '24px'}} onClick={() => setCollapsed(!collapsed)}></i>
            }
            <h1 className='text-2xl font-bold'>{t('APP_NAME')}</h1>
            <div className='flex items-center gap-1'>
            <LanguageSwitcher />
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
