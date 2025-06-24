import { Layout as ANTDLayout } from 'antd';
import { Outlet } from 'react-router';
import styles from './MainLayout.module.scss';

export const MainLayout = () => {
    return (
        <ANTDLayout className={styles.mainLayout}>
            <ANTDLayout.Content>
                <Outlet />
            </ANTDLayout.Content>
        </ANTDLayout>
    );
};
