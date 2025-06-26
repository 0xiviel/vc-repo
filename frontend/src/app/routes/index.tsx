import { FullScreenLoader } from '@shared/ui/fullscreen-loader';
import { AuthLayout, MainLayout } from '@shared/ui/layout';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

const MainPage = lazy(() => import('@pages/main'));
const NotFoundPage = lazy(() => import('@pages/not-found'));

const SignInPage = lazy(() => import('@pages/signin'));
const RegisterPage = lazy(() => import('@pages/register'));

export const AppRoutes = () => {
    return (
        <Suspense fallback={<FullScreenLoader />}>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path='/signin' element={<SignInPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                </Route>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<MainPage />} />
                </Route>
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};
