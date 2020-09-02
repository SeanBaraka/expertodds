import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Member } from "./Member";

@Entity({name: 'logins'})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    email: string;

    @Column()
    salt: string;

    @Column()
    password: string;

    @Column({
        default: false
    })
    isStaff: boolean;

    @OneToOne(type => Member, member => member.user, {
        onDelete: 'CASCADE',
    })
    member: Member;

}
