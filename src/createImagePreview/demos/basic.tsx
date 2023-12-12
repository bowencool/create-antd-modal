import React from 'react';
import { Button } from 'antd';
import { createImagePreview } from 'create-antd-modal';

const Demo: React.FC = () => {
  return (
    <Button
      onClick={() => {
        createImagePreview({
          items: [
            'https://dummyimage.com/100x100/394FC4/FFF.png&text=1',
            'https://dummyimage.com/100x100/894FC4/FFF.png&text=2',
          ],
          preview: {
            current: 1, // default index of preview images
            scaleStep: 0.1,
          },
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
