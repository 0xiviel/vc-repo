import { Flex, Image, Typography } from 'antd';
import MainBg from '@shared/assets/images/main-page-bg.jpg';
import styles from './Main.module.scss';

export const Main = () => {
    return (
        <Flex className={styles.main}>
            <Flex
                className={`container ${styles.mainContainer}`}
                align='center'
                justify='space-between'
            >
                <Flex vertical>
                    <Typography.Title className={styles.title}>
                        Find Your Perfect Workspace with EventBook
                    </Typography.Title>
                    <Typography.Title className={styles.subtitle}>
                        Book meeting rooms, desks, and event spaces — anytime,
                        anywhere.
                    </Typography.Title>
                </Flex>
                <Image src={MainBg} preview={false} width='50%' />
            </Flex>
        </Flex>
    );
};
