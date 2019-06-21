import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Message} from "./message.entity";

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) {

    }

    async get(id: number) {
        return this.messageRepository.findOne(id);
    }

    async getMessages(dialod: number, message: number) {}

    async createMessage(message) {
        return await this.messageRepository.save(
            this.messageRepository.create(message)
        );
    }

    async deleteMessage(id: number) {

    }

}