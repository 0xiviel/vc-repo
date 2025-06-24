import { Layout as ANTDLayout } from 'antd';
import { Outlet } from 'react-router';
import styles from './MainLayout.module.scss';
import { Header } from './components/header';

export const MainLayout = () => {
    return (
        <ANTDLayout className={styles.mainLayout}>
            <Header/>
            <ANTDLayout.Content>
                <Outlet />
            </ANTDLayout.Content>
        </ANTDLayout>
    );
};
