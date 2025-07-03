import type { User } from '@entities/user';
import { createContext, use } from 'react';

type AuthContent = {
    user: User | undefined;
    isAuthenticated: boolean;
};

const initialContext: AuthContent = {
    user: undefined,
    isAuthenticated: false,
};

export const AuthContext = createContext(initialContext);

export const useAuth = () => {
    return use(AuthContext);
};
