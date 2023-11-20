import React, { isValidElement, Children, useEffect, useRef, useState } from 'react';
import { Root, createRoot } from 'react-dom/client';
import type { ReactNode } from 'react';
import type { ValidateFields } from 'rc-field-form/es/interface';
import type { ModalProps } from 'antd';
import { Modal } from 'antd';

type FormLike<T> = {
  validateFields?: ValidateFields<T>;
  validateFieldsReturnFormatValue?: ValidateFields<T>;
  [key: string]: any;
};
export type CreateModalProps<T, R = undefined> = Omit<
  ModalProps,
  'onOk' | 'visible' | 'destroyOnClose' | 'confirmLoading'
> & {
  /**
   * @description An alias to `children` prop. The modal body content, usually a form.
   * @description.zh-CN `children`的别名，弹窗内容，通常是一个表单。
   * */
  content?: ReactNode /* | Component | FunctionComponent | ExoticComponent */;
  /**
   * @description Same as content prop, but higher priority
   * @description.zh-CN 同 content ，优先级高于 content
   * */
  render?: (formRef: React.MutableRefObject<any /* todo: FormLike<T> */ | undefined>) => ReactNode;
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
  /**
   * @description.zh-CN 隐藏“取消”按钮
   * */
  // hideCancel?: boolean;
  /**
   * @description.zh-CN 隐藏“确认”按钮
   * */
  // hideOk?: boolean;
  /**
   * @description.zh-CN “拒绝”按钮文本
   * */
  // denyText?: string;
  /**
   * @description.zh-CN “拒绝”按钮（传入此字段才显示）事件，返回 promise 可以延迟关闭
   * */
  // onDeny?: (values?: T) => Promise<void> | void;
  /**
   * @description Container for Modal, usually various Context.Provide. We strongly recommend using `createFunctionWithDefaultProps` to inject this param.
   * @description.zh-CN Modal 的容器，通常为各种 Context.Provider，我们强烈推荐您使用 `createFunctionWithDefaultProps` 注入此参数。
   */
  // container?: React.FC<React.PropsWithChildren>;
};

export type CreateModalReturn<T, R> = {
  /**
   * @description Results only when the modal is closed.
   * @description.zh-CN 弹窗关闭时才有的结果
   */
  promise: Promise<R>;
  destory: () => void;
};

export function TmpComp<T, R>({
  content,
  children = content,
  render,
  onOk,
  onCancel,
  onFailed,
  // onDeny,
  // denyText,
  // hideCancel = false,
  // hideOk = false,
  ...rest
}: CreateModalProps<T, R>) {
  const formLikeRef = useRef<FormLike<T>>();
  const [visible, setVisible] = useState(false);
  // const { /* direction, */ getPrefixCls } = React.useContext(ConfigContext);
  // const prefixCls = getPrefixCls('modal');
  // const rootPrefixCls = getPrefixCls();

  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    // for animation
    setVisible(true);
  }, []);
  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const validateFields =
        formLikeRef.current?.validateFieldsReturnFormatValue || formLikeRef.current?.validateFields;
      const values = await validateFields?.();
      await onOk?.(values);
      setVisible(false);
    } catch (error) {
      // console.error(error);
      onFailed?.(error);
      // throw error;
    } finally {
      setConfirmLoading(false);
    }
  };
  // const handleDeny = async () => {
  //   setConfirmLoading(true);
  //   try {
  //     const validateFields =
  //       formLikeRef.current?.validateFieldsReturnFormatValue || formLikeRef.current?.validateFields;
  //     const values = await validateFields?.();
  //     await onDeny?.(values);
  //     setVisible(false);
  //   } catch (error) {
  //     onFailed?.(error);
  //     console.error(error);
  //     // throw error;
  //   } finally {
  //     setConfirmLoading(false);
  //   }
  // };
  const handleCancel: typeof onCancel = (e) => {
    setVisible(false);
    onCancel?.(e);
  };

  const renderPropChildren = () => {
    if (render) return render(formLikeRef);
    let attached = false;
    return Children.map(children, (child) => {
      if (!isValidElement(child)) {
        return child;
      }
      if (attached) return child;
      const childProps = {
        ...child.props,
        ref: formLikeRef,
      };
      attached = true;
      return React.cloneElement(child, childProps);
    });
  };

  return (
    // <LocaleReceiver componentName="Modal">
    //   {(contextLocale) => (
    <Modal
      // prefixCls={prefixCls}
      {...rest}
      // todo context value and locale
      // todo extra footer buttons
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      onOk={handleOk}
      // okText={contextLocale.okText || contextLocale.justOkText}
      // cancelText={contextLocale.cancelText}
      // footer={[
      //   hideCancel || (
      //     <Button key="cancel" onClick={handleCancel}>
      //       {rest?.cancelText || '取消'}
      //     </Button>
      //   ),
      //   onDeny && (
      //     <Button key="deny" type="primary" danger loading={confirmLoading} onClick={handleDeny}>
      //       {denyText || '驳回'}
      //     </Button>
      //   ),
      //   hideOk || (
      //     <Button key="ok" type="primary" loading={confirmLoading} onClick={handleOk}>
      //       {rest?.okText || '确定'}
      //     </Button>
      //   ),
      // ]}
      destroyOnClose
      open={visible}
    >
      {renderPropChildren()}
    </Modal>
    //   )}
    // </LocaleReceiver>
  );
}
