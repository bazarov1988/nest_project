import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './../config';
import { AuthModule } from './../auth';
import { ProductsModule } from './../products';
import { GatewaysModule } from './../gateways';
import { ChatModule } from './../chat';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule,
    AuthModule,
    ProductsModule,
    GatewaysModule,
    ChatModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule { }
