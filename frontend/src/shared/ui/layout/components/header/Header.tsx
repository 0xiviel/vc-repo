import {
    Layout as ANTDLayout,
    Button,
    Drawer,
    Flex,
    Space,
    Typography,
} from 'antd';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router';
import { APP_TOKEN_KEY } from '@shared/constants';
import { useMediaQuery } from '@shared/hooks';
import { MenuFoldOutlined } from '@ant-design/icons';
import { useState } from 'react';

export const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem(APP_TOKEN_KEY);
    const isMobile = useMediaQuery('(max-width: 576px)');
    const [showDrawer, setShowDrawer] = useState(false);

    const onLogin = () => navigate('/signin');
    const onSignup = () => navigate('/register');
    const onLogout = () => {
        localStorage.removeItem(APP_TOKEN_KEY);
        navigate('/signin');
    };

    const rightContent = (
        <Space direction={isMobile ? 'vertical' : 'horizontal'}>
            {isAuthenticated ? (
                <Button onClick={onLogout}>Logout</Button>
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
                <Typography.Text>EventBook</Typography.Text>
                {displayedRightContent}
            </Flex>
        </ANTDLayout.Header>
    );
};
