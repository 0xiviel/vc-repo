import {
    Layout as ANTDLayout,
    Avatar,
    Button,
    Drawer,
    Dropdown,
    Flex,
    Space,
    Typography,
    type MenuProps,
} from 'antd';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router';
import { APP_TOKEN_KEY } from '@shared/constants';
import { useAuth, useMediaQuery } from '@shared/hooks';
import {
    AppstoreOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useUserSignOut } from '@entities/user';

export const Header = () => {
    const navigate = useNavigate();
    const userSignOut = useUserSignOut();
    const isAuthenticated = !!localStorage.getItem(APP_TOKEN_KEY);
    const isMobile = useMediaQuery('(max-width: 576px)');
    const [showDrawer, setShowDrawer] = useState(false);
    const { user } = useAuth();

    const onLogin = () => navigate('/signin');
    const onSignup = () => navigate('/register');
    const onLogout = () => userSignOut.mutate();
    const onAdminPanelClick = () => navigate('/admin/equipments');

    const items: MenuProps['items'] = [
        ...(!user?.is_superuser // REMOVE !
            ? [
                  {
                      key: 'adminPanel',
                      label: 'Admin panel',
                      icon: <AppstoreOutlined />,
                      onClick: onAdminPanelClick,
                  },
              ]
            : []),
        {
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: onLogout,
            disabled: userSignOut?.isPending,
        },
    ];

    const rightContent = (
        <Space direction={isMobile ? 'vertical' : 'horizontal'}>
            {isAuthenticated ? (
                <>
                    <Dropdown
                        menu={{ items }}
                        placement='bottomRight'
                        trigger={['click']}
                    >
                        <Flex
                            align='center'
                            gap={8}
                            style={{ cursor: 'pointer' }}
                        >
                            <Avatar icon={<UserOutlined />} />
                            {user?.username && (
                                <Typography.Text strong>
                                    {user?.username}
                                </Typography.Text>
                            )}
                        </Flex>
                    </Dropdown>
                </>
            ) : (
                <>
                    <Button onClick={onLogin}>Log in</Button>
                    <Button onClick={onSignup} type='primary'>
                        Sign up
                    </Button>
                </>
            )}
        </Space>
    );

    const displayedRightContent = isMobile ? (
        <>
            <Button onClick={() => setShowDrawer((prevState) => !prevState)}>
                <MenuFoldOutlined />
            </Button>
            <Drawer open={showDrawer} onClose={() => setShowDrawer(false)}>
                {rightContent}
            </Drawer>
        </>
    ) : (
        rightContent
    );

    return (
        <ANTDLayout.Header className={styles.header}>
            <Flex
                justify='space-between'
                align='center'
                style={{ height: '100%' }}
            >
                <Link to='/'>
                    <Typography.Text>EventBook</Typography.Text>
                </Link>
                {displayedRightContent}
            </Flex>
        </ANTDLayout.Header>
    );
};
