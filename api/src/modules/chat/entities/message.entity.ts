import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne} from 'typeorm';
import {User} from "../../user";
import {Dialog} from "./dialog.entity";

@Entity({
    name: 'messages',
})
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    message: string;

    @OneToOne(type => Dialog)
    @JoinColumn()
    dialog: Dialog;

    @OneToOne(type => User)
    @JoinColumn()
    sender: User;

    @Column({default: 1})
    status: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    dateCreate: string;
}