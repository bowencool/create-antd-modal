import React from 'react';
import { Button, message } from 'antd';
import { createModal } from 'create-antd-modal';
import UserSelect from './UserSelect';
import type { User } from './UserSelect';
import { someService } from './services';

const Demo: React.FC = () => {
  return (
    <Button
      onClick={() => {
        createModal<User[]>({
          title: 'Select Users',
          maskClosable: false,
          /* Same as children: <UserSelect /> */
          render: (formLikeRef) => <UserSelect ref={formLikeRef} />,
          async onOk(values) {
            console.log(`Selected Users:`, values);
            if (values) {
              await someService(values);
              message.success('Submit successful');
            }
          },
          onFailed(error) {
            if (error instanceof Error) {
              message.error(error.message);
            }
          },
        });
      }}
    >
      Select Users
    </Button>
  );
};

export default Demo;
