import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router';

export const AppProviders = (props: PropsWithChildren) => {
    return <BrowserRouter>{props.children}</BrowserRouter>;
};
