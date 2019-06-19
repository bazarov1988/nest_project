import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Message} from './message.entity';
import {ChatService} from './chat.service';
import {ChatController} from './chat.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Message]),
    ],
    controllers: [ChatController],
    exports: [ChatService],
    providers: [
        ChatService,
    ],
})
export class ChatModule {
}