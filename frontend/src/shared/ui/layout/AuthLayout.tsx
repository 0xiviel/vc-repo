import { Layout as ANTDLayout } from 'antd';
import styles from './AuthLayout.module.scss';
import { Outlet } from 'react-router';

export const AuthLayout = () => {
    return (
        <ANTDLayout className={styles.authLayout}>
            <ANTDLayout.Content className={styles.authContent}>
                <Outlet />
            </ANTDLayout.Content>
        </ANTDLayout>
    );
};
