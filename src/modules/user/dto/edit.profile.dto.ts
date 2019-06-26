import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class EditProfileDto {
    @ApiModelProperty({
        required: true,
    })
    @IsNotEmpty()
    firstName: string;

    @ApiModelProperty({
        required: true,
    })
    @IsNotEmpty()
    lastName: string;
}
