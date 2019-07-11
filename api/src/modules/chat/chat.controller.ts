import {Controller, Post, Get, Param, Body, UseGuards, Delete, Req, HttpException, HttpStatus} from '@nestjs/common';
import {ChatService} from "./chat.service";
import {MessageDto} from "./dto/";
import {MESSAGES_CONSTANTS} from "../../constants/constants";
import {JwtAuthGuard} from "../auth";
import {Usr} from "../../decorators";
import {ApiResponse} from "@nestjs/swagger";
import {UsersService} from "../user/services";

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
        private readonly userService: UsersService
    ) {
    }

    //Send message in dialog
    @Post()
    @ApiResponse({status: 201, description: 'Successful Request'})
    async sendMessage(@Param('id') userId: number, @Body() payload, @Req() req, @Usr() user) {
        const sender = user.id;
        const dialog = payload.dialog;
        const messagePayload = {
            senderId: sender,
            message: payload.message,
            status: MESSAGES_CONSTANTS.NEW_MESSAGE
        };
        if (dialog) {
            const dialogModel = await this.chatService.getDialog(dialog);
            if (dialogModel) {
                messagePayload['dialogId'] = dialog;
            } else {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        return this.chatService.createMessage(messagePayload);
    }

    //send new message via form
    @Post('send-custom-message')
    @ApiResponse({status: 201, description: 'Successful Request'})
    async sendCustomMessage(@Param('id') userId: number, @Body() payload, @Req() req, @Usr() user) {
        const receiver = payload.user;
        const sender = user.id;
        const messagePayload = {
            sender: sender,
            message: payload.message,
            status: MESSAGES_CONSTANTS.NEW_MESSAGE
        };
        const receiverObj = await this.userService.get(receiver);
        if (sender && receiver && receiverObj) {
            let dialog = await this.chatService.getDialogByUsers(sender, receiver);
            if (dialog) {
                this.chatService.updateDialogMessageCounter(dialog, sender);
                messagePayload['dialog'] = dialog['id'];
                return this.chatService.createMessage(messagePayload);
            } else {
                let dialog = await this.chatService.createDialog({
                    name: 'users_dialog',
                    creator: sender
                });
                if (dialog['id']) {
                    [sender, receiver].map(async userId => {
                        await this.chatService.assignDialog({
                            user: userId,
                            dialog: dialog['id'],
                            messages: userId === sender ? 0 : 1
                        });
                    });
                }
                messagePayload['dialog'] = dialog['id'];
                return this.chatService.createMessage(messagePayload);
            }
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

    }

    //Get list of messages
    @Get()
    @ApiResponse({status: 201, description: 'Successful Request'})
    async getMyMessages(@Param('dialog') dialog: number, @Param('page') page: number) {
        return this.chatService.getMessages(dialog, page);
    }

    //Delete message
    @Delete(':id')
    @ApiResponse({status: 201, description: 'Successful Request'})
    async deleteMessage(@Param() params, @Usr() user) {
        const message = this.chatService.getMessage(params.id);
        if (message) {
            return this.chatService.deleteMessage(params.id, user.id);
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    //Delete dialog
    @Delete('dialog/:id')
    @ApiResponse({status: 201, description: 'Successful Request'})
    async deleteDialog(@Param() params, @Usr() user) {
        const message = this.chatService.getDialog(params.id);
        if (message) {
            return this.chatService.deleteDialog(params.id, user.id);
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }
}
