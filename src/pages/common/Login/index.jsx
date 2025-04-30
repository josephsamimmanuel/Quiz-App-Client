import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../../../apiCalls/users';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/users';
import { ROUTES } from '../../../utils/constants';
import { useTranslation } from 'react-i18next';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onFinish = async (values) => {
    try {
      toast.loading(t('TOAST_MESSAGES.LOGGING_IN'));
      const response = await loginUser(values);
      console.log('Login response:', response); // Debug log
      
      if (response.success) {
        const token = response.data.token;
        console.log('Token received:', token); // Debug log
        
        sessionStorage.setItem('token', token);
        console.log('Token stored in sessionStorage:', sessionStorage.getItem('token')); // Debug log
        
        dispatch(setUser(response?.data));
        navigate(ROUTES.PROTECTED.USER.HOME);
        toast.dismiss();
        toast.success(response.message);
      } else {
        toast.dismiss();
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Login error:', error); // Debug log
      toast.dismiss();
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen w-screen '>
      <div className='card w-25'>
        <h1 className='text-xl text-center'>{t('LOGIN.PAGE_TITLE')}</h1>
        <hr className='my-4'/>
        <Form layout='vertical' className='w-full' onFinish={onFinish}>
          <Form.Item label={t('LOGIN.FORM_LABELS.EMAIL')} name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input placeholder={t('LOGIN.FORM_PLACEHOLDERS.EMAIL')} type='email' className='input' />
          </Form.Item>
          <Form.Item label={t('LOGIN.FORM_LABELS.PASSWORD')} name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder={t('LOGIN.FORM_PLACEHOLDERS.PASSWORD')} type='password' className='input' />
          </Form.Item>
          <Button type="primary" htmlType="submit" className='w-full mb-4'>
            {t('LOGIN.FORM_BUTTONS.LOGIN')}
          </Button>
        </Form>
        <Link to="/register" className='text-center w-full text-decoration-none mt-4'>
          {t('LOGIN.LINK.NEW_USER')}
        </Link>
      </div>
    </div>
  )
}

export default Login
