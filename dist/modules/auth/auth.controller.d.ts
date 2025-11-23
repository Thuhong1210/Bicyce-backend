import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/requests/register-user.dto';
import { LoginDto } from './dto/requests/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterUserDto): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            role: import("./enums/user-role.enum").UserRole;
            createdAt: Date;
        };
        accessToken: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            role: import("./enums/user-role.enum").UserRole;
            createdAt: Date;
        };
        accessToken: string;
    }>;
    getProfile(req: any): Promise<import("./entities/user.entity").User>;
}
