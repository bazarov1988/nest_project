import {Controller, Post, Get, Param, Body, UseGuards, Delete, Req} from '@nestjs/common';
import {ChatService} from "./chat.service";
import {MessageDto} from "./message.dto";
import {JwtAuthGuard} from "../auth";
import {Usr} from "../../decorators";
import {ApiResponse} from "@nestjs/swagger";

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
    constructor(private readonly chatService: ChatService) {
    }

    @Post()
    @ApiResponse({status: 201, description: 'Successful Request'})
    async sendMessage(@Param('id') userId: number, @Body() payload, @Req() req, @Usr() user) {
        const message: MessageDto = Object.assign({}, payload, {senderId: 88, receiverId: 89, status: 78});
        return await this.chatService.createMessage(message);
    }

    @Get()
    @ApiResponse({status: 201, description: 'Successful Request'})
    async getMyMessages(@Param('dialog') dialog: number) {

    }

    @Delete(':id')
    @ApiResponse({status: 201, description: 'Successful Request'})
    async deleteMyMessage() {

    }
}
