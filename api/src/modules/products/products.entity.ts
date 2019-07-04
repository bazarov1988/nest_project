import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'products',
})
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255 })
    description: string;

    @Column({ length: 255 })
    picture: string;

    @Column({ length: 255 })
    price: string;

    @Column({ length: 255 })
    status: string;
}

