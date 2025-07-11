export type SignInData = {
    username: string;
    password: string;
};

export type SignInResponse = {
    access_token: string;
    token_type: 'bearer';
};

export type RegisterData = {
    email: string;
    password: string;
    username: string;
};

export type RegisterResponse = {
    id: number;
    email: string;
    username: string;
};

export type User = {
    id: number;
    email: string;
    username: string;
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
};
