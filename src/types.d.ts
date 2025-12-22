export interface PasswordItem {
    id: string;
    platform: string;
    account: string;
    password: string;
    remark: string;
    updatedAt: number;
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}
