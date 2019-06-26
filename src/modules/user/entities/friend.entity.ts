import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty, IsNumber} from "class-validator";
import {ApiModelProperty} from "@nestjs/swagger";

@Entity({
    name: 'friend_requests',
})
export class Friend {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiModelProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    FriendId: number;

    @ApiModelProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    status: number;
}

export class FriendFillableFields {
    userId: number;
    friendId: number;
    status: number;
}

export const FRIEND_CONSTANTS = {
    NEW_REQUEST: 1,
    CONFIRM: 2,
    DECLINE: 3
};