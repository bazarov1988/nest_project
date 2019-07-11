import * as crypto from 'crypto';
import {Injectable, NotAcceptableException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {User, UserFillableFields} from '../entities';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
    }

    async getAll() {
        return await this.userRepository.find();
    }

    async get(id: number) {
        return await this.userRepository.findOne(id);
    }

    async getByEmail(email: string) {
        return await this.userRepository.createQueryBuilder('users')
            .where('users.email = :email')
            .setParameter('email', email)
            .getOne();
    }

    async getByEmailAndPass(email: string, password: string) {
        const passHash = crypto.createHmac('sha256', password).digest('hex');
        return await this.userRepository.createQueryBuilder('users')
            .where('users.email = :email and users.password = :password')
            .setParameter('email', email)
            .setParameter('password', passHash)
            .getOne();
    }

    async create(
        payload: UserFillableFields,
    ) {
        const user = await this.getByEmail(payload.email);

        if (user) {
            throw new NotAcceptableException(
                'User with provided email already created.',
            );
        }

        return await this.userRepository.save(
            this.userRepository.create(payload),
        );
    }

    async editProfile(payload) {

    }
}
