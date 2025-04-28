import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../../../apiCalls/users';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/users';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      toast.loading('Logging in...');
      const response = await loginUser(values);
      if (response.success) {
        sessionStorage.setItem('token', response.data.token);
        dispatch(setUser(response?.data));
        navigate('/home');
        toast.dismiss();
        toast.success(response.message);
      } else {
        toast.dismiss();
        toast.error(response.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <div className='card w-25'>
        <h1 className='text-xl text-center'>Login</h1>
        <hr className='my-4'/>
        <Form layout='vertical' className='w-full' onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input placeholder='Enter your email' type='email' className='input' />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder='Enter your password' type='password' className='input' />
          </Form.Item>
          <Button type="primary" htmlType="submit" className='w-full mb-4'>
            Login
          </Button>
        </Form>
        <Link to="/register" className='text-center w-full text-decoration-none mt-4'>
          New User? Register
        </Link>
      </div>
    </div>
  )
}

export default Login
