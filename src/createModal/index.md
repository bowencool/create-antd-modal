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

<code title="With Form" src="./demos/with-form.tsx" desc="Attempts to call `Form`'s `validateFieldsReturnFormatValue` or `validateFields` method when you click Ok button, and its returned value will be passed to `onOk`. If `onOk` returns a promise, Ok button will be loading until the promise done, if rejected, the modal won't close." />

### Custom Component

<code title="Custom Component" src="./demos/custom.tsx" desc="Custom Component is treated like a form." />

<API>Everything else is the same as [Modal](https://ant.design/components/modal/#header).</API>
