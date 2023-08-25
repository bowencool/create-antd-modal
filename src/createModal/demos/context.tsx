import React from 'react';
import { Button } from 'antd';
import { createModal } from 'create-antd-modal';
import RootContainer from './RootContainer';

const Demo: React.FC = () => {
  return (
    <Button
      onClick={() => {
        createModal({
          title: 'Some title',
          content: 'You can see that the i18n and theme configuration works now',
          container: RootContainer,
        });
      }}
    >
      Custom Container
    </Button>
  );
};

export default Demo;
