import React from 'react';
import { Button } from 'antd';
import { createImagePreview } from 'create-antd-modal';

const Demo: React.FC = () => {
  return (
    <Button
      onClick={() => {
        createImagePreview({
          images: [
            'https://dummyimage.com/100x100/394FC4/FFF.png&text=1',
            'https://dummyimage.com/100x100/894FC4/FFF.png&text=2',
          ],
          current: 1,
          onClose() {
            console.log('Close');
          },
        });
      }}
    >
      Basic
    </Button>
  );
};

export default Demo;
