import {Injectable, NotAcceptableException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Friend} from '../entities';
import {FRIEND_CONSTANTS} from '../../../constants/constants';

@Injectable()
export class FriendsService {
    constructor(
        @InjectRepository(Friend)
        private readonly friendRepository: Repository<Friend>,
    ) {
    }

    async get(id: number) {
        return this.friendRepository.findOne(id);
    }

    async createFriendRequest(user: number, friend: number) {
        const userModel = this.get(user);
        const friendModel = this.get(friend);
        if (userModel && friendModel) {
            const payload = {
                userId: user,
                friendId: friend,
                status: FRIEND_CONSTANTS.NEW_REQUEST
            };
            return await this.friendRepository.save(
                this.friendRepository.create(payload)
            )
        } else {
            throw new NotAcceptableException(
                'No such user',
            );
        }
    }

    async acceptFriendRequest(id: number, user: number) {
        const request = await this.get(id);
        if (request['friendId'] === user && request['status'] === FRIEND_CONSTANTS.NEW_REQUEST) {
            return await this.friendRepository.update({id: id}, {status: FRIEND_CONSTANTS.CONFIRM});
        } else {
            throw new NotAcceptableException(
                'Something went wrong',
            );
        }
    }

    async declineFriendRequest(id: number, user: number) {
        const request = await this.get(id);
        if (request['friendId'] === user && request['status'] === FRIEND_CONSTANTS.NEW_REQUEST) {
            return await this.friendRepository.update({id: id}, {status: FRIEND_CONSTANTS.DECLINE});
        } else {
            throw new NotAcceptableException(
                'Something went wrong',
            );
        }
    }

    async deleteFriendRequest(id: number, user: number) {
        const request = await this.get(id);
        if (request['userId'] === user) {
            return await this.friendRepository.delete({id: id});
        } else {
            throw new NotAcceptableException(
                'Something went wrong',
            );
        }
    }
}