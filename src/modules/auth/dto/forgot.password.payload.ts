import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordPayload {
    @ApiModelProperty({
        required: true,
    })
    @IsEmail()
    email: string;
}
