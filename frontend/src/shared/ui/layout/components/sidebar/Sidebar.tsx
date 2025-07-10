import { LaptopOutlined, LogoutOutlined } from '@ant-design/icons';
import { useUserSignOut } from '@entities/user';
import { Layout as ANTDLayout, Flex, Menu, type MenuProps } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router';
import styles from './Sidebar.module.scss';

export const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPage = location.pathname.replace('/admin/', '');
    const userSignOut = useUserSignOut();

    const menu: MenuProps['items'] = [
        {
            key: 'equipments',
            icon: <LaptopOutlined />,
            label: 'Equipments',
            onClick: () => navigate('/admin/equipments'),
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: () => userSignOut.mutate(),
            disabled: userSignOut?.isPending,
        },
    ];

    return (
        <ANTDLayout.Sider className={styles.sidebar} collapsible>
            <Flex
                align='center'
                justify='center'
                className={styles.titleWrapper}
            >
                <Link to='/'>EventBook</Link>
            </Flex>
            <Menu
                className={styles.menu}
                mode='inline'
                items={menu}
                selectedKeys={[currentPage]}
            />
        </ANTDLayout.Sider>
    );
};
