import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Message, Dialog, UserDialogs, UserMessages} from './entities';
import {ChatService} from './chat.service';
import {ChatController} from './chat.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Message, Dialog, UserDialogs, UserMessages]),
    ],
    controllers: [ChatController],
    exports: [ChatService],
    providers: [
        ChatService,
    ],
})
export class ChatModule {
}