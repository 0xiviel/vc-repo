import { lazy } from 'react';
import { Route, Routes } from 'react-router';

const MainPage = lazy(() => import('@pages/main'));

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
        </Routes>
    );
};
