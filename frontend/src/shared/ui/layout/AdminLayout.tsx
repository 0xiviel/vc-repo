import { Layout as ANTDLayout } from 'antd';
import { Navigate, Outlet } from 'react-router';
import styles from './AdminLayout.module.scss';
import { Sidebar } from './components/sidebar';
import { useAuth } from '@shared/hooks';

export const AdminLayout = () => {
    const { user } = useAuth();

    // CHANGE THIS TO !
    if (user?.is_superuser) {
        return <Navigate to='/' />;
    }

    return (
        <ANTDLayout className={styles.adminLayout}>
            <Sidebar />
            <ANTDLayout.Content className={styles.content}>
                <Outlet />
            </ANTDLayout.Content>
        </ANTDLayout>
    );
};
