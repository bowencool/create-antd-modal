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
  src="./demos/with-form2.tsx"
  desc="Results only when the modal is closed."
/>

### Custom Component

<code
  title="Custom Component"
  src="./demos/custom.tsx"
  desc="Custom Component is treated like a form."
/>

### Custom Container

<code
  title="Custom Container"
  src="./demos/context.tsx"
  desc="Get Context through Custom Container"
/>

### Default Props

<code
  title="Default Props"
  src="./demos/default-props.tsx"
  desc="You can fill some common props in advance to make your code clearer."
/>

<API>Everything else is the same as [Modal](https://ant.design/components/modal/#header).

Returns:

```ts
export type CreateModalReturn<T, R> = {
  /**
   * @description Results only when the modal is closed.
   * @description.zh-CN 弹窗关闭时才有的结果
   */
  promise: Promise<R>;
  destory: () => void;
};
```

</API>
