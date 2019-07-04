import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne} from 'typeorm';
import {User} from "../../user/entities";
import {Message} from "./message.entity";

@Entity({
    name: 'users_messages',
})
export class UserMessages {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    @OneToOne(type => Message)
    @JoinColumn()
    message: Message;

    @Column({default: 1})
    status: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    dateCreate: string;
}