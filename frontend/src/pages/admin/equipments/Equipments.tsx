import { Card, Space, Table, type TableProps } from 'antd';
import styles from './Equipments.module.scss';

type DataType = {
    key: string;
    id: number;
    name: string;
    created_at: string;
};

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Created at',
        dataIndex: 'created_at',
        key: 'created_at',
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size='middle'>
                <a>View</a>
            </Space>
        ),
        width: 80,
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'Equipment1',
        id: 32,
        created_at: '2025-07-08',
    },
    {
        key: '2',
        name: 'Equipment2',
        id: 42,
        created_at: '2025-07-08',
    },
    {
        key: '3',
        name: 'Equipment3',
        id: 32,
        created_at: '2025-07-08',
    },
    {
        key: '4',
        name: 'Equipment1',
        id: 36,
        created_at: '2025-07-08',
    },
    {
        key: '5',
        name: 'Equipment2',
        id: 45,
        created_at: '2025-07-08',
    },
    {
        key: '6',
        name: 'Equipment3',
        id: 31,
        created_at: '2025-07-08',
    },
];

export const Equipments = () => {
    return (
        <Card className={styles.equipments} title='Equipments list'>
            <Table<DataType>
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        </Card>
    );
};
