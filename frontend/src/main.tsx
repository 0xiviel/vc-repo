import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'antd/dist/reset.css';
import './index.css';
import '@ant-design/v5-patch-for-react-19';
import { AppProviders, AppRoutes } from '@app';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppProviders>
            <AppRoutes />
        </AppProviders>
    </StrictMode>
);
