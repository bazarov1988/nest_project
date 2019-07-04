import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '../config';
import { AuthModule } from '../auth';
import { ProductsModule } from '../products';
import { GatewaysModule } from '../gateways';
import { ChatModule } from '../chat';
import { UserModule } from '../user';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule,
    AuthModule,
    ProductsModule,
    GatewaysModule,
    ChatModule,
    UserModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule { }
