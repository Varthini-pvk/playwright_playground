export interface LoginResponse
{
    accessToken: string;
    refreshToken: string;
    id: number;
    username: string;
    email: string;
}

export interface UserDetailsResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    role: string;
}