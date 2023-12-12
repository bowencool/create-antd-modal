import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { PreviewGroupPreview, GroupConsumerProps } from 'rc-image/lib/PreviewGroup';
import { Image } from 'antd';

export type CreateImagePreviewProps = Omit<GroupConsumerProps, 'preview'> & {
  preview?: Omit<PreviewGroupPreview, 'visible' | 'onVisibleChange' | 'onChange'>;
  /**
   * @description callback on close
   */
  onClose?: () => void;
  /**
   * @deprecated use `items` instead
   * @description alias of `items` for compatibility
   * @default []
   */
  images?: GroupConsumerProps['items'];
  /**
   * @deprecated use `preview.current` instead
   * @description alias of `preview.current` for compatibility
   * @default []
   */
  current?: PreviewGroupPreview['current'];
};

function App({ preview, onClose, images, current: oldCurrent, ...rest }: CreateImagePreviewProps) {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(preview?.current || oldCurrent || 0);
  useEffect(() => {
    setVisible(true);
  }, []);
  return (
    <Image.PreviewGroup
      items={images}
      {...rest}
      preview={{
        ...preview,
        current,
        onChange: setCurrent,
        visible,
        onVisibleChange: (vis) => {
          setVisible(vis);
          if (!vis) {
            onClose?.();
          }
        },
      }}
    />
  );
}

export default function createImagePreview({ onClose, ...rest }: CreateImagePreviewProps) {
  setTimeout(() => {
    const div = document.createElement('div');
    div.setAttribute('role', 'Dynamically created preview');
    document.body.appendChild(div);
    const root = createRoot(div);
    function destory() {
      setTimeout(() => {
        root.unmount();
        document.body.removeChild(div);
        // console.log('destoryed preview');
      });
    }

    root.render(
      <App
        {...rest}
        onClose={() => {
          setTimeout(() => {
            destory();
          }, 200);
          onClose?.();
        }}
      />,
    );
  });
}
