import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../../../apiCalls/users';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await registerUser(values);
      if (response.success) {
        toast.success(response.message);
        navigate('/login');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
    <div className='card w-25'>
      <h1 className='text-xl text-center'>Register</h1>
      <hr className='my-4'/>
      <Form layout='vertical' className='w-full' onFinish={onFinish}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input placeholder='Enter your name' type='text' className='input' />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input placeholder='Enter your email' type='email' className='input' />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder='Enter your password' type='password' className='input' />
        </Form.Item>
        <Button type="primary" htmlType="submit" className='w-full mb-4'>
          Register
        </Button>
      </Form>
      <Link to="/login" className='text-center text-decoration-none mt-4'>
        Already have an account? Login
      </Link>
    </div>
  </div>
  )
}

export default Register
