import React from 'react';
import createModal from '.';
import usePatchElement from 'antd/es/_util/hooks/usePatchElement';

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

export function useCreateModal(): readonly [contextHolder: React.ReactElement] {
  const holderRef = React.useRef<ElementsHolderRef>(null);

  // ========================== Effect ==========================
  const [actionQueue, setActionQueue] = React.useState<(() => void)[]>([]);

  React.useEffect(() => {
    if (actionQueue.length) {
      const cloneQueue = [...actionQueue];
      cloneQueue.forEach((action) => {
        action();
      });

      setActionQueue([]);
    }
  }, [actionQueue]);

  // =========================== Hook ===========================
  const modalRef = React.createRef<HookModalRef>();
  let closeFunc: Function | undefined;
  const modal = (
    <HookModal
      key={`modal-${uuid}`}
      // config={withFunc(config)}
      ref={modalRef}
      afterClose={() => {
        closeFunc?.();
      }}
    />
  );
  closeFunc = holderRef.current?.patchElement(modal);
  return [<ElementsHolder key="modal-holder" ref={holderRef} />];
}
