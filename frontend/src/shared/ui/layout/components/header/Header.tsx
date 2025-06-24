import { Layout as ANTDLayout, Button, Flex, Space, Typography } from 'antd';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router';

export const Header = () => {
    const navigate = useNavigate();

    const onLogin = () => navigate('/login');
    const onSignup = () => navigate('/signup');

    return (
        <ANTDLayout.Header className={styles.header}>
            <Flex justify='space-between' align='center'>
                <Typography.Text>EventBook</Typography.Text>
                <Space>
                    <Button onClick={onLogin}>Log in</Button>
                    <Button onClick={onSignup} type='primary'>
                        Sign up
                    </Button>
                </Space>
            </Flex>
        </ANTDLayout.Header>
    );
};
