export interface User {
    id: string;
    _id?: string;
    email: string;
    role: 'company' | 'admin';
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}
