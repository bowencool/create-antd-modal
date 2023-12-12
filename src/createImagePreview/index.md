---
title: createImagePreview
order: 2
nav:
  path: /documents
group:
  path: /documents/functions
---

## Demos

### Basic Usage

<code title="Basic" src="./demos/basic.tsx" />

### API

Everything is the same as [Image.PreviewGroup](https://ant.design/components/image#previewgroup).

```ts
import type { PreviewGroupPreview, GroupConsumerProps } from 'rc-image/lib/PreviewGroup';

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
```
