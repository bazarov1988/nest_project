import {Controller, Body, Post, HttpException, HttpStatus} from '@nestjs/common';
import {ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {AuthService} from './';
import {LoginPayload, RegisterPayload, ForgotPasswordPayload} from './dto';
import {UsersService} from './../user';


@Controller('auth')
@ApiUseTags('authentication')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ) {
    }

    @Post('login')
    @ApiResponse({status: 201, description: 'Successful Login'})
    @ApiResponse({status: 400, description: 'Bad Request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    async login(@Body() payload: LoginPayload): Promise<any> {
        const user = await this.authService.signIn(payload);
        return await this.authService.createToken(user);
    }

    @Post('register')
    @ApiResponse({status: 201, description: 'Successful Registration'})
    @ApiResponse({status: 400, description: 'Bad Request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    async register(@Body() payload: RegisterPayload): Promise<any> {
        const user = await this.userService.create({
            email: payload['email'],
            firstName: payload['fullName'],
            lastName: '',
            password: payload['password']
        });
        return await this.authService.createToken(user);
    }

    @Post('forgot-password')
    @ApiResponse({status: 201, description: 'Successful Request'})
    @ApiResponse({status: 400, description: 'Bad Request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    async forgotPassword(@Body() payload: ForgotPasswordPayload): Promise<any> {
        const user = await this.userService.getByEmail(payload.email);
        if (user) {
            return user;
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }
}
