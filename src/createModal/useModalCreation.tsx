import React from 'react';
import usePatchElement from 'antd/es/_util/hooks/usePatchElement';
import { CreateModalProps, CreateModalReturn, TmpComp } from './component';

interface ElementsHolderRef {
  patchElement: ReturnType<typeof usePatchElement>[1];
}
let uuid = 0;

const ElementsHolder = React.memo(
  React.forwardRef<ElementsHolderRef>((_props, ref) => {
    const [elements, patchElement] = usePatchElement();
    React.useImperativeHandle(
      ref,
      () => ({
        patchElement,
      }),
      [],
    );
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{elements}</>;
  }),
);

export function useModalCreation<P, Q = void>(
  defaultProps?: Omit<CreateModalProps<P, Q>, 'children' | 'render'>,
): readonly [
  contextHolder: React.ReactElement,
  createModal: <T, R = void>(params: CreateModalProps<T, R>) => CreateModalReturn<T, R>,
] {
  const holderRef = React.useRef<ElementsHolderRef>(null);

  /**
   * @description Create a one-off modal dialog dynamically without maintenance loading and visible.
   * @description.zh-CN 动态创建一次性的模态框，不需要维护 loading 和 visible。
   */
  function createModal<T, R = void>(params: CreateModalProps<T, R>): CreateModalReturn<T, R> {
    let _resolve: (value: R | PromiseLike<R>) => void, _reject: (reason?: any) => void;
    const defered = new Promise<R>((resolve, reject) => {
      _reject = reject;
      _resolve = resolve;
    });

    let unmountFunc: Function | undefined;
    function destory() {
      setTimeout(() => {
        unmountFunc?.();
        _reject('destory');
      });
    }
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     * Sync render blocks React event. Let's make this async.
     */
    setTimeout(() => {
      unmountFunc = holderRef.current?.patchElement(
        <TmpComp<T, R>
          key={`modal-${uuid++}`}
          afterClose={destory}
          {...defaultProps}
          {...params}
          onOk={(values?: T) => {
            const Result = params.onOk?.(values);
            _resolve(Result || (values as R));
            return Result;
          }}
          onCancel={(e) => {
            params.onCancel?.(e);
            _reject('cancel');
          }}
        />,
      );
    });
    return { destory, promise: defered };
  }
  return [<ElementsHolder key="modal-holder" ref={holderRef} />, createModal];
}
