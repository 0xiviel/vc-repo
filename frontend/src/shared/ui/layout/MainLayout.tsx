import { Layout as ANTDLayout } from 'antd';
import { Outlet } from 'react-router';
import styles from './MainLayout.module.scss';
import { Header } from './components/header';
import { Footer } from './components/footer';

export const MainLayout = () => {
    return (
        <ANTDLayout className={styles.mainLayout}>
            <Header />
            <ANTDLayout.Content className={styles.content}>
                <Outlet />
            </ANTDLayout.Content>
            <Footer />
        </ANTDLayout>
    );
};
