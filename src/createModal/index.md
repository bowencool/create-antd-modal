---
nav:
  title: Documents
  path: /documents
---

## Demos

### Basic Usage

<code title="Basic" src="./demos/basic.tsx" />

### With Form

<code title="With Form" src="./demos/with-form.tsx" />

### Custom Component

<code title="Custom Component" src="./demos/custom.tsx" />

## API

```ts | pure
import React from 'react';
import type { ReactNode } from 'react';
import type { ValidateFields } from 'rc-field-form/es/interface';
import type { ModalProps } from 'antd';
declare type FormLike<T> = {
  validateFields?: ValidateFields<T>;
  validateFieldsReturnFormatValue?: ValidateFields<T>;
  [key: string]: any;
};
export declare type CreateModalProps<T> = Omit<
  ModalProps,
  'onOk' | 'visible' | 'destroyOnClose' | 'confirmLoading'
> & {
  /**
   * @description An alias to `children` prop. The modal body content, usually a form, attempts to call its validateFields method when you click Ok button
   * @description.zh-CN `children`的别名，弹窗内容，通常是一个表单，点击确认时会尝试调用其 validateFields 方法
   * */
  content?: ReactNode;
  /**
   * @description Same as content prop, but higher priority
   * @description.zh-CN 同 content ，优先级高于 content
   * */
  render?: (formRef: React.MutableRefObject<FormLike<T> | undefined>) => ReactNode;
  /**
   * @description "Ok" button events that return a Promise can delay closing. Parameter is the value passed by the content
   * @description.zh-CN “确认”按钮事件，返回 promise 可以延迟关闭。参数为弹窗内容传递的值
   * */
  onOk?: (values?: T) => Promise<void> | void;
  /**
   * @description Callback for validation failure and onOk failure
   * @description.zh-CN 验证失败和 onOk 失败的回调
   * */
  onFailed?: (error: unknown) => void;
};
/**
 * @description Create a one-time modal dialog dynamically without maintenance loading and visible.
 */
export default function createModal<T>(params: CreateModalProps<T>): void;
export {};
```
