import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne} from 'typeorm';
import {User} from "../../user/entities";
import {Dialog} from "./dialog.entity";

@Entity({
    name: 'users_dialogs',
})
export class UserDialogs {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn()
    user: User;

    @ManyToOne(type => Dialog)
    @JoinColumn()
    dialog: Dialog;

    @Column({default: 1})
    messages: number;

    @Column({default: 1})
    status: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    dateCreate: string;
}