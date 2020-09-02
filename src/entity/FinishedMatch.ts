import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, Column} from "typeorm";
import { Tip } from "./Tip";

@Entity({name: 'finished_matches'})
export class FinishedMatch {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(type => Tip, tip => tip.score, {
        cascade: true,
        eager: true
    })
    @JoinColumn({name: 'tip_id'})
    fixture: Tip;

    @Column()
    score: string

    @Column()
    isWon: boolean
}
