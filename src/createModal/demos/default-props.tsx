import React from 'react';
import { Button } from 'antd';
import { createFunctionWithDefaultProps } from 'create-antd-modal';
import RootContainer from './RootContainer';

const createModal = createFunctionWithDefaultProps({
  title: 'Tip',
  modalRender: (modal) => <RootContainer>{modal}</RootContainer>,
  maskStyle: {
    opacity: 0.8,
  },
});

const Demo: React.FC = () => {
  return (
    <Button
      onClick={() => {
        createModal({
          content: 'You can see that the i18n and theme configuration works now',
        });
      }}
    >
      Fill some common props in advance
    </Button>
  );
};

export default Demo;
