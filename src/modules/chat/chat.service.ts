import {Injectable, NotAcceptableException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getRepository} from 'typeorm';
import {Message, UserMessages, Dialog, UserDialogs} from "./entities";
import {MESSAGES_CONSTANTS, DIALOG_CONSTANTS} from "../../constants/constants";

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @InjectRepository(UserMessages)
        private readonly userMessagesRepository: Repository<UserMessages>,
        @InjectRepository(Dialog)
        private readonly dialogRepository: Repository<Dialog>,
        @InjectRepository(UserDialogs)
        private readonly userDialogsRepository: Repository<UserDialogs>,
    ) {

    }

    async getMessage(id: number) {
        return await this.messageRepository.findOneOrFail(id);
    }

    async getDialog(id: number) {
        return await this.dialogRepository.findOneOrFail(id);
    }

    async getDialogByUsers(sender: number, receiver: number) {
        return await getRepository(Dialog).createQueryBuilder('d').select('d.*')
            .innerJoin('user_dialogs', 'u_d', 'd.id=u_d.dialogId')
            .where(`(d.creatorId=${sender} and u_d.userId=${receiver}) OR (d.creatorId=${receiver} and u_d.userId=${sender})`).getOne();
    }

    async getUserMessage(messageId: number, userId: number) {
        return await this.userMessagesRepository.findOneOrFail({where: {messageId, userId}});
    }

    async getUserDialog(dialogId: number, userId: number) {
        return await this.userDialogsRepository.findOneOrFail({where: {dialogId, userId}});
    }

    async createMessage(message) {
        return await this.messageRepository.save(
            this.messageRepository.create(message)
        );
    }

    async createDialog(dialog) {
        return await this.messageRepository.save(
            this.messageRepository.create(dialog)
        );
    }

    async assignDialog(payload) {
        return await this.userDialogsRepository.save(
            this.userDialogsRepository.create(payload)
        );
    }

    async deleteMessage(message, user: number) {
        if (message.senderId === user) {
            return await this.messageRepository.update(message.id, {status: MESSAGES_CONSTANTS.DELETED_MESSAGE})
        } else {
            const userMessage = this.getUserMessage(message.id, user);
            if (userMessage) {
                return await this.userMessagesRepository.update(userMessage['id'], {status: MESSAGES_CONSTANTS.DELETED_MESSAGE})
            } else {
                throw new NotAcceptableException(
                    'Something went wrong',
                );
            }
        }
    }

    async deleteDialog(dialog, user: number) {
        if (dialog.userId === user) {
            return await this.dialogRepository.update(dialog.id, {status: DIALOG_CONSTANTS.DELETED_DIALOG})
        } else {
            const userDialog = this.getUserDialog(dialog.id, user);
            if (userDialog) {
                return await this.userDialogsRepository.update(userDialog['id'], {status: DIALOG_CONSTANTS.DELETED_DIALOG})
            } else {
                throw new NotAcceptableException(
                    'Something went wrong',
                );
            }
        }
    }

    async getMessages(dialod: number, page: number) {
        const dialog = this.getDialog(dialod);
        if (dialog) {
            return this.messageRepository.find({
                where: {dialogId: dialog},
                relations: ["sender"],
                order: {dateCreate: "DESC"},
                take: MESSAGES_CONSTANTS.MESSAGES_QUANTITY,
                skip: MESSAGES_CONSTANTS.MESSAGES_QUANTITY * --page
            });
        } else {
            throw new NotAcceptableException(
                'Something went wrong',
            );
        }
    }

    async updateDialogMessageCounter(id: number, creator: number) {
        const dialog = await this.getDialog(id);
        if (dialog && dialog['creatorId'] === creator) {
            return await this.dialogRepository.update({id}, {unreadMessages: dialog.unreadMessages++})
        } else {
            throw new NotAcceptableException(
                'Something went wrong'
            );
        }
    }
}