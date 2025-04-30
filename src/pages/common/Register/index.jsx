import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../../../apiCalls/users';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { REGISTER, ROUTES } from '../../../utils/constants';

function Register() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await registerUser(values);
      if (response.success) {
        toast.success(response.message);
        navigate(ROUTES.COMMON.LOGIN);
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
      <h1 className='text-xl text-center'>{REGISTER.PAGE_TITLE}</h1>
      <hr className='my-4'/>
      <Form layout='vertical' className='w-full' onFinish={onFinish}>
        <Form.Item label={REGISTER.FORM_LABELS.NAME} name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input placeholder={REGISTER.FORM_PLACEHOLDERS.NAME} type='text' className='input' />
        </Form.Item>
        <Form.Item label={REGISTER.FORM_LABELS.EMAIL} name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input placeholder={REGISTER.FORM_PLACEHOLDERS.EMAIL} type='email' className='input' />
        </Form.Item>
        <Form.Item label={REGISTER.FORM_LABELS.PASSWORD} name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder={REGISTER.FORM_PLACEHOLDERS.PASSWORD} type='password' className='input' />
        </Form.Item>
        <Button type="primary" htmlType="submit" className='w-full mb-4'>
          {REGISTER.FORM_BUTTONS.REGISTER}
        </Button>
      </Form>
      <Link to="/login" className='text-center text-decoration-none mt-4'>
        {REGISTER.LINK.ALREADY_HAVE_ACCOUNT}
      </Link>
    </div>
  </div>
  )
}

export default Register
