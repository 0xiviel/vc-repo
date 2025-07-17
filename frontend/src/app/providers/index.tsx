import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App, ConfigProvider } from 'antd';
import { type PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router';
import { AuthContextProvider } from './AuthContext';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
        },
    },
});

export const AppProviders = (props: PropsWithChildren) => {
    return (
        <BrowserRouter>
            <ConfigProvider
                theme={{ cssVar: true, hashed: false }}
                wave={{ disabled: true }}
            >
                <App>
                    <QueryClientProvider client={queryClient}>
                        <AuthContextProvider>
                            {props.children}
                        </AuthContextProvider>
                    </QueryClientProvider>
                </App>
            </ConfigProvider>
        </BrowserRouter>
    );
};
