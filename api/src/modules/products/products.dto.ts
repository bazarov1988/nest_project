import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsNumber } from 'class-validator';

export class ProductsDto {
    @ApiModelProperty({
        required: true,
    })
    @IsNotEmpty()
    name: string;

    @ApiModelProperty({
        required: true,
    })
    @IsNotEmpty()
    description: string;

    @ApiModelProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    price: string;
}
