import {ApiModelProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, MinLength} from 'class-validator';

export class RegisterPayload {
    @ApiModelProperty({
        required: true,
    })
    @IsNotEmpty()
    fullName: string;

    @ApiModelProperty({
        required: true,
    })
    @IsEmail()
    email: string;

    @ApiModelProperty({
        required: true,
    })
    @IsNotEmpty()
    @MinLength(5)
    password: string;

    @ApiModelProperty({
        required: true,
    })
    @IsNotEmpty()
    @MinLength(5)
    confirmPassword: string;

    @ApiModelProperty({
        required: true,
    })
    @IsNotEmpty()
    terms: boolean;
}
