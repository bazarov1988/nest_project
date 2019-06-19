import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne} from 'typeorm';
import {User} from "../user";

@Entity({
    name: 'messages',
})
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    message: string;

    @Column({default: 1})
    status: number;

    @OneToOne(type => User)
    @JoinColumn()
    sender: User;

    @OneToOne(type => User)
    @JoinColumn()
    receiver: User;
}