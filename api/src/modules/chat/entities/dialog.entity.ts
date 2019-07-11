import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne} from 'typeorm';
import {User} from "../../user";

@Entity({
    name: 'dialogs',
})
export class Dialog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    name: string;

    @Column({default: 1})
    status: number;

    @ManyToOne(type => User)
    @JoinColumn()
    creator: User;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    dateCreate: string;
}