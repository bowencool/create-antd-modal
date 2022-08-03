import { Table } from 'antd';
import React, { forwardRef, useState, useImperativeHandle } from 'react';

export interface User {
  id: React.Key;
  name: string;
  age: number;
}

const UserSelect = forwardRef((_props: Record<string, any>, ref) => {
  const [selected, setSelected] = useState<User[]>([]);

  useImperativeHandle(ref, () => ({
    async validateFields(): Promise<User[]> {
      if (selected.length === 0) {
        throw new Error('One at least');
      } else if (selected.length > 2) {
        throw new Error('Two at most');
      }
      return selected;
    },
  }));
  return (
    <Table<User>
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text: string) => <a>{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
        },
      ]}
      dataSource={[
        {
          id: '1',
          name: 'John Brown',
          age: 32,
        },
        {
          id: '2',
          name: 'Jim Green',
          age: 42,
        },
        {
          id: '3',
          name: 'Joe Black',
          age: 32,
        },
      ]}
      pagination={false}
      rowKey="id"
      rowSelection={{
        type: 'checkbox',
        selectedRowKeys: selected.map((user) => user.id),
        onChange(keys, rows) {
          setSelected(rows);
        },
      }}
    />
  );
});

export default UserSelect;
