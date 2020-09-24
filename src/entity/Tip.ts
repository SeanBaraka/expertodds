import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToOne} from "typeorm";
import { FinishedMatch } from "./FinishedMatch";

@Entity({name: 'tips'})
export class Tip {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    matchDate: string;

    @Column()
    tournament: string;

    @Column()
    home: string;

    @Column()
    away: string;

    @Column()
    homeOdds: string;

    @Column()
    awayOdds: string;

    @Column()
    drawOdds: string;

    @Column()
    prediction: string;

    @Column()
    predictionOdds: string;

    @Column({
        default: false
    })
    isVip: boolean;

    @Column({
        default: false
    })
    isFeatured: boolean

    @Column({
        default: false
    })
    isComplete: boolean

    @OneToOne(type => FinishedMatch, finished => finished.fixture, {
        onDelete: 'CASCADE'
    })
    score: FinishedMatch

}
