import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { User } from "./User";

@Entity({name: 'members'})
export class Member {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(type => User, user  => user.member, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    user: User

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    telephone: string;

    @Column({
        default: false
    })
    isVip: boolean;

}
