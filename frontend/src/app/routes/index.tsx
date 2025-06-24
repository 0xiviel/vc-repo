import { FullScreenLoader } from '@shared/ui/fullscreen-loader';
import { AuthLayout, MainLayout } from '@shared/ui/layout';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

const MainPage = lazy(() => import('@pages/main'));

const LoginPage = lazy(() => import('@pages/login'));

export const AppRoutes = () => {
    return (
        <Suspense fallback={<FullScreenLoader />}>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path='/' element={<LoginPage />} />
                </Route>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<MainPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
};
