import React from 'react';
import { Root, createRoot } from 'react-dom/client';
import { CreateModalProps, CreateModalReturn, TmpComp } from './component';
// import LocaleReceiver from 'antd/es/locale-provider/LocaleReceiver';
// import { ModalLocale } from 'antd/es/modal/locale';

/**
 * @description Create a one-off modal dialog dynamically without maintenance loading and visible.
 * @description.zh-CN 动态创建一次性的模态框，不需要维护 loading 和 visible。
 */
export default function createModal<T, R = void>(
  params: CreateModalProps<T, R>,
): CreateModalReturn<T, R> {
  let _resolve: (value: R | PromiseLike<R>) => void, _reject: (reason?: any) => void;
  const defered = new Promise<R>((resolve, reject) => {
    _reject = reject;
    _resolve = resolve;
  });
  const div = document.createElement('div');
  div.setAttribute('role', 'Dynamically created modal');
  document.body.appendChild(div);
  let root: Root | null = null;

  function destory() {
    setTimeout(() => {
      root?.unmount();
      document.body.removeChild(div);
      _reject('destory');
    });
  }
  /**
   * https://github.com/ant-design/ant-design/issues/23623
   * Sync render blocks React event. Let's make this async.
   */
  setTimeout(() => {
    root = createRoot(div);
    root.render(
      <TmpComp<T, R>
        afterClose={destory}
        {...params}
        onOk={(values?: T) => {
          const Result = params.onOk?.(values);
          _resolve(Result || (values as R));
          return Result;
        }}
        // onFailed={async (error) => {
        //   reject(await params.onFailed?.(error));
        // }}
        onCancel={(e) => {
          params.onCancel?.(e);
          _reject('cancel');
        }}
      />,
    );
  });
  return { destory, promise: defered };
}
/**
 * @deprecated use `useModalCreation` instead
 */
export function createFunctionWithDefaultProps<T, R = void>(defaultParams: CreateModalProps<T, R>) {
  const newFunction: typeof createModal<T, R> = (params) =>
    createModal<T, R>({ ...defaultParams, ...params });
  return newFunction;
}

export { useModalCreation } from './useModalCreation';
