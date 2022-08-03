/**
 * title: Basic
 */
import React from 'react';
import { Button } from 'antd';
import { createModal } from 'create-antd-modal';

const Basic: React.FC = (props) => {
  return (
    <>
      <Button
        onClick={() => {
          createModal({
            title: 'Some title',
            content: 'Some descriptions',
            onOk() {
              console.log('OK');
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        }}
      >
        Basic
      </Button>
    </>
  );
};

export default Basic;
