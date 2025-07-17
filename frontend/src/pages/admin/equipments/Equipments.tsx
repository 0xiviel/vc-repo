import { Button, Card, Space, Table, type TableProps } from 'antd';
import styles from './Equipments.module.scss';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { AddEquipment } from './components/AddEquipment';
import { EditEquipment } from './components/EditEquipment';
import type { Equipment } from '@entities/equipment';

const data: Equipment[] = [
    {
        name: 'Equipment1',
        id: 32,
        description:
            'Lorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip sam',
    },
    {
        name: 'Equipment2',
        id: 42,
        description:
            'Lorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip sam',
    },
    {
        name: 'Equipment3',
        id: 32,
        description:
            'Lorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip sam',
    },
    {
        name: 'Equipment1',
        id: 36,
        description:
            'Lorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip sam',
    },
    {
        name: 'Equipment2',
        id: 45,
        description:
            'Lorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip sam',
    },
    {
        name: 'Equipment3',
        id: 31,
        description:
            'Lorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip samLorem ip sam',
    },
];

export const Equipments = () => {
    const [showAddEquipment, setShowAddEquipment] = useState(false);
    const [showEditEquipment, setShowEditEquipment] = useState(false);

    const columns: TableProps<Equipment>['columns'] = [
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
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (__, record) => record.description.substring(0, 10),
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size='middle'>
                    <Button
                        icon={<EditOutlined />}
                        size='small'
                        onClick={() => setShowEditEquipment(true)}
                    />
                </Space>
            ),
            width: 80,
        },
    ];

    return (
        <Card
            className={styles.equipments}
            title='Equipments list'
            extra={
                <Button
                    icon={<PlusOutlined />}
                    type='primary'
                    onClick={() => setShowAddEquipment(true)}
                >
                    Add Equipment
                </Button>
            }
        >
            <Table<Equipment>
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            <AddEquipment
                show={showAddEquipment}
                onClose={() => setShowAddEquipment(false)}
            />
            <EditEquipment
                show={showEditEquipment}
                onClose={() => setShowEditEquipment(false)}
            />
        </Card>
    );
};
