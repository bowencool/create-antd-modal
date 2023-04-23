import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { createModal } from 'create-antd-modal';
import { someService } from './services';

type LoginPaylod = { username: string; password: string };

const Demo: React.FC = () => {
  return (
    <Button
      onClick={() => {
        const { destory } = createModal<LoginPaylod>({
          title: 'Login',
          maskClosable: false,
          // Same as render: formLikeRef => <Form ref={formLikeRef}>...</Form>
          children: (
            <Form
              name="login"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
              initialValues={{ username: 'create-antd-modal' }}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>
              <Button onClick={() => destory()}>Destory</Button>
            </Form>
          ),
          async onOk(values) {
            console.log(`Logging in with:`, values);
            await someService(values);
            message.success('Login successful');
          },
        });
      }}
    >
      Login
    </Button>
  );
};

export default Demo;
