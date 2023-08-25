import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

const RootContainer: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ConfigProvider
    locale={zhCN}
    theme={{
      token: {
        // Seed Token，影响范围大
        colorPrimary: '#00b96b',
        borderRadius: 18,

        // 派生变量，影响范围小
        colorBgContainer: '#f6ffed',
      },
    }}
  >
    {children}
  </ConfigProvider>
);

export default RootContainer;
