import {Controller, Post, Get, Param, Body, UseGuards, Delete} from '@nestjs/common';
import {JwtAuthGuard} from "../auth";
import {UsersService, FriendsService} from "./services";
import {EditProfileDto} from "./dto";
import {Usr} from '../../decorators';
import {ApiResponse} from "@nestjs/swagger";

@Controller('user-controller')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(
        private readonly userService: UsersService,
        private readonly friendService: FriendsService,
    ) {
    }

    @Get(':id')
    async getProfile(@Param('id') id: number) {
        return await this.userService.get(id)
    }

    @Get('my-profile')
    @ApiResponse({status: 201, description: 'Successful Request'})
    async getMyProfile(@Usr() currentUser) {
        return await this.userService.get(currentUser.id)
    }

    @Post()
    @ApiResponse({status: 201, description: 'Successful Request'})
    async editProfile(@Param('id') user: number, @Body() payload: EditProfileDto) {
        return await this.userService.editProfile(payload);
    }

    @Post('send-friend-request')
    @ApiResponse({status: 201, description: 'Successful Request'})
    async sendRequest(@Param('id') user: number) {
        return await this.friendService.createFriendRequest(user, user);
    }

    @Post('accept-friend-request')
    @ApiResponse({status: 201, description: 'Successful Request'})
    async acceptRequest(@Param('id') id: number, @Usr() currentUser) {
        return await this.friendService.acceptFriendRequest(id, currentUser.id);
    }

    @Post('decline-friend-request')
    @ApiResponse({status: 201, description: 'Successful Request'})
    async declineRequest(@Param('id') id: number, @Usr() currentUser) {
        return await this.friendService.declineFriendRequest(id, currentUser.id);
    }

    @Delete('decline-friend-request')
    @ApiResponse({status: 201, description: 'Successful Request'})
    async deleteRequest(@Param('id') id: number, @Usr() currentUser) {
        return await this.friendService.deleteFriendRequest(id, currentUser.id);
    }

}
