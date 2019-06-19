import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class MessageDto {
    @ApiModelProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    senderId: string;

    @ApiModelProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    receiverId: string;

    @ApiModelProperty({
        required: true,
    })
    @IsNotEmpty()
    message: string;
}
