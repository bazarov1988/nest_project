import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DialogDto {
    @ApiModelProperty({
        required: true,
    })
    @IsNotEmpty()
    name: string;

    @ApiModelProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    creatorId: string;
}
