import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Image } from 'antd';

export type CreateImagePreviewProps = {
  /**
   * @description image urls to preview
   * @default []
   */
  images?: string[];
  /**
   * @description initial index to preview
   * @default 0
   */
  current?: number;
  /**
   * @description callback on close
   */
  onClose?: () => void;
};

function App({ images = [], current = 0, onClose }: CreateImagePreviewProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);
  return (
    <div style={{ display: 'none' }}>
      <Image.PreviewGroup
        preview={{
          visible,
          onVisibleChange: (vis) => {
            setVisible(vis);
            if (!vis) {
              onClose?.();
            }
          },
          current,
        }}
      >
        {images?.filter(Boolean)?.map((img) => (
          <Image key={img} src={img} />
        ))}
      </Image.PreviewGroup>
    </div>
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
