import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
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

    @ManyToOne(type => Dialog)
    @JoinColumn()
    dialog: Dialog;

    @ManyToOne(type => User)
    @JoinColumn()
    sender: User;

    @Column({default: 1})
    status: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    dateCreate: string;
}