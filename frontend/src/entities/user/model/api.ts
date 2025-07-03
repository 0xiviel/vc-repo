import { apiClient } from '@shared/lib/api';
import {
    useMutation,
    useQuery,
    type QueryObserverResult,
    type UseBaseMutationResult,
} from '@tanstack/react-query';
import type {
    RegisterData,
    RegisterResponse,
    SignInData,
    SignInResponse,
    User,
} from '../types';
import { useNavigate } from 'react-router';
import { APP_TOKEN_KEY } from '@shared/constants';

const getUserInfo = async (): Promise<User> => {
    const response = await apiClient.get<User>('/users/me');
    return response.data;
};

const userSignIn = async (data: SignInData): Promise<SignInResponse> => {
    const response = await apiClient.post<SignInResponse>(
        '/auth/jwt/login',
        data,
        {
            headers: {
                'Content-Type ': 'application/x-www-form-urlencoded',
            },
        }
    );
    return response.data;
};

const userRegister = async (data: RegisterData): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>(
        '/auth/register',
        data
    );
    return response.data;
};

const userSignOut = async (): Promise<void> => {
    const response = await apiClient.post('/auth/jwt/logout');
    return response.data;
};

export const useGetUserInfo = (): QueryObserverResult<User> => {
    return useQuery<User>({
        queryFn: async () => getUserInfo(),
        queryKey: ['getUserInfo'],
        enabled: !!localStorage.getItem(APP_TOKEN_KEY),
    });
};

export const useUserSignIn = (): UseBaseMutationResult<
    SignInResponse,
    unknown,
    SignInData,
    unknown
> => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: SignInData) => userSignIn(data),
        onSuccess: (data) => {
            navigate('/');
            localStorage.setItem(APP_TOKEN_KEY, data?.access_token);
        },
    });
};

export const useUserRegister = (): UseBaseMutationResult<
    RegisterResponse,
    unknown,
    RegisterData,
    unknown
> => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (data: RegisterData) => userRegister(data),
        onSuccess: () => {
            navigate('/signin');
        },
    });
};

export const useUserSignOut = (): UseBaseMutationResult<
    void,
    unknown,
    void,
    unknown
> => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: () => userSignOut(),
        onSuccess: () => {
            localStorage.removeItem(APP_TOKEN_KEY);
            navigate('/signin');
        },
    });
};
