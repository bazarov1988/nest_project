import {Global, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Friend } from './entities';
import { UsersService, FriendsService } from './services';
import { UserController } from './user.controller'

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Friend]),
  ],
  controllers: [UserController],
  exports: [UsersService,FriendsService],
  providers: [
    UsersService, FriendsService
  ],
})
export class UserModule { }