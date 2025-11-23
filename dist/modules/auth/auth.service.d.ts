import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/requests/register-user.dto';
import { LoginDto } from './dto/requests/login.dto';
import { UserRole } from './enums/user-role.enum';
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    register(dto: RegisterUserDto): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            role: UserRole;
            createdAt: Date;
        };
        accessToken: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            role: UserRole;
            createdAt: Date;
        };
        accessToken: string;
    }>;
    getProfile(userId: number): Promise<User>;
}
