import { ConfigProvider } from 'antd';
import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router';

export const AppProviders = (props: PropsWithChildren) => {
    return (
        <BrowserRouter>
            <ConfigProvider wave={{ disabled: true }}>
                {props.children}
            </ConfigProvider>
        </BrowserRouter>
    );
};
