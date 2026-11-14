import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateAuthDto, LoginAuthDto } from './dto/index.js';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Tokens } from './types/tokens.type.js';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/login')
    @ApiOperation({ summary: 'User Login' })
    @ApiResponse({ status: 200, description: 'Login Successful' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Invalid Credentials' })
    login(@Body() dto: LoginAuthDto) {
        this.authService.login(dto);
    }

    @Post('/register')
    @ApiOperation({ summary: 'User Register' })
    @ApiResponse({ status: 200, description: 'Register Successful' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Invalid Credentials' })
    register(@Body() dto:CreateAuthDto){
        this.authService.register(dto);
    }
    @Post('/logout')
    logout() {
        this.authService.logout();
    }
    @Post('/refresh')
    refreshToken() {
        this.authService.refreshToken();
    }
    @Patch('/change-password')
    changePassword() {
        this.authService.changePassword();
    }
}
