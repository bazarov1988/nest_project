import {Controller, Post, Get, Param, Body, UseGuards, Delete} from '@nestjs/common';
import {ChatService} from "./chat.service";
import {MessageDto} from "./message.dto";
import {JwtAuthGuard} from "../auth";

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
    constructor(private readonly chatService: ChatService) {
    }


    @Post()
    async sendMessage(@Param('id') user: number, @Body() payload) {
        const message: MessageDto = Object.assign({}, payload, {senderId: 88, receiverId: 89, status: 78});
        return await this.chatService.createMessage(message);
    }


    @Get()
    async getMyMessages(@Param('dialog') dialog: number) {

    }

    @Delete(':id')
    async deleteMyMessage() {

    }


}
