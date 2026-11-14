import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service.js';
import { CreateAuthDto, LoginAuthDto } from './dto/auth.dto.js';
import { Tokens } from './types/tokens.type.js';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    // helper
    hashData(data: string) {
        return bcrypt.hash(data, 10)
    }


    login(dto: LoginAuthDto) {

    }

    async register(dto: CreateAuthDto){
        const hash = await this.hashData(dto.passwordHash)
        const newUser =await this.prisma.user.create({
            data: {
                fullName: dto.fullName,
                passwordHash: hash,
                username: dto.username,
                role: dto.role,
            },
        })

    }
    logout() { }
    refreshToken() { }
    changePassword() { }
}
