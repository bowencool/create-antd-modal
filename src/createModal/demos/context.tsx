import React from 'react';
import { Button } from 'antd';
import { useModalCreation } from 'create-antd-modal';
import RootContainer from './RootContainer';

const Demo: React.FC = () => {
  const [contextHolder, createModal] = useModalCreation();
  return (
    <RootContainer>
      <Button
        onClick={() => {
          createModal({
            title: 'Some title',
            content: 'You can see that the i18n and theme configuration works now',
          });
        }}
      >
        Context Providing
      </Button>
      {contextHolder}
    </RootContainer>
  );
};

export default Demo;
