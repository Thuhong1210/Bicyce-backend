import { UserRole } from '../enums/user-role.enum';
export declare class User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
