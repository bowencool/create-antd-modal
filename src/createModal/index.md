---
title: createModal
order: 1
nav:
  title: Documents
  path: /documents
group:
  title: Functions
  path: /documents/functions
---

## Demos

### Basic Usage

<code title="Basic" src="./demos/basic.tsx" />

### With Form

<code
  title="With Form"
  src="./demos/with-form.tsx"
  desc="Attempts to call `Form`'s `validateFieldsReturnFormatValue` or `validateFields` method when you click Ok button, and its returned value will be passed to `onOk`. If `onOk` returns a promise, Ok button will be loading until the promise done, if rejected, the modal won't close."
/>

### Promise when Modal is closed

<code
  title="Promise"
  src="./demos/with-form-promise.tsx"
  desc="Results only when the modal is closed."
/>

### Custom Component

<code
  title="Custom Component"
  src="./demos/custom-component.tsx"
  desc="Custom Component is treated like a form."
/>

### Context Providing

<code
  title="Context Providing"
  src="./demos/context.tsx"
/>

### Default Props

<code
  title="Default Props"
  src="./demos/default-props.tsx"
  desc="You can fill some common props in advance to make your code clearer."
/>

Everything else is the same as [Modal](https://ant.design/components/modal/#header).

## API

```ts
import React from 'react';
import type { ReactNode } from 'react';
import type { ModalProps } from 'antd';
export declare type CreateModalProps<T, R = undefined> = Omit<
  ModalProps,
  'onOk' | 'visible' | 'destroyOnClose' | 'confirmLoading'
> & {
  /**
   * @description An alias to `children` prop. The modal body content, usually a form.
   * @description.zh-CN `children`的别名，弹窗内容，通常是一个表单。
   * */
  content?: ReactNode;
  /**
   * @description Same as content prop, but higher priority
   * @description.zh-CN 同 content ，优先级高于 content
   * */
  render?: (formRef: React.MutableRefObject<any | undefined>) => ReactNode;
  /**
   * @description "Ok" button events that return a Promise can delay closing. Parameter is the value passed by the content, the return value will be passed to the final return Promise.
   * @description.zh-CN “确认”按钮事件，返回 promise 可以延迟关闭。参数为弹窗内容传递的值，返回值会被传递给最终返回的 Promise。
   * */
  onOk?: (values?: T) => Promise<R> | R | undefined;
  /**
   * @description Callback for validation failure and onOk failure, will not cause the modal to close, and will not cause the final returned Promise to reject
   * @description.zh-CN 验证失败和 onOk 失败的回调，不会导致弹窗关闭，也不会导致最终返回的 Promise reject
   * */
  onFailed?: (error: unknown) => any;
};
export declare type CreateModalReturn<T, R> = {
  /**
   * @description Results only when the modal is closed.
   * @description.zh-CN 弹窗关闭时才有的结果
   */
  promise: Promise<R>;
  destory: () => void;
};
/**
 * @description Create a one-time modal dialog dynamically without maintenance loading and visible.
 * @description.zh-CN 动态创建一次性的模态框，不需要维护 loading 和 visible。
 */
export default function createModal<T, R = void>(
  params: CreateModalProps<T, R>,
): CreateModalReturn<T, R>;
export declare function createFunctionWithDefaultProps<T, R = void>(
  defaultParams: CreateModalProps<T, R>,
): (params: CreateModalProps<T, R>) => CreateModalReturn<T, R>;
```
