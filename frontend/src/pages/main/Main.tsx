import { Button, Flex, Image, Space, Typography } from 'antd';
import MainBg from '@shared/assets/images/main-page-bg.jpg';
import styles from './Main.module.scss';
import { useNavigate } from 'react-router';
import { useGetUserInfo } from '@entities/user';

export const Main = () => {
    const userInfo = useGetUserInfo();
    const navigate = useNavigate();
    console.log(userInfo)
    const onBook = () => navigate('/book-form');

    return (
        <Flex className={styles.main}>
            <Flex
                className={`container ${styles.mainContainer}`}
                align='center'
                justify='space-between'
            >
                <Space direction='vertical'>
                    <Typography.Title className={styles.title}>
                        Find Your Perfect Workspace with EventBook
                    </Typography.Title>
                    <Typography.Title className={styles.subtitle}>
                        Book meeting rooms, desks, and event spaces — anytime,
                        anywhere.
                    </Typography.Title>
                    <Button type='primary' onClick={onBook}>
                        Book a workspace
                    </Button>
                </Space>
                <Image src={MainBg} preview={false} width='50%' />
            </Flex>
        </Flex>
    );
};
