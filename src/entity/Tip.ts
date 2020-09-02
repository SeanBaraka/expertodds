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
    matchDate: Date;

    @Column()
    tournament: string;

    @Column()
    home: string;

    @Column()
    away: string;

    @Column()
    homeOdds: number;

    @Column()
    awayOdds: number;

    @Column()
    drawOdds: number;

    @Column()
    prediction: string;

    @Column()
    predictionOdds: number;

    @Column({
        default: false
    })
    isVip: boolean;

    @Column({
        default: false
    })
    isFeatured: boolean

    @OneToOne(type => FinishedMatch, finished => finished.fixture, {
        onDelete: 'CASCADE'
    })
    score: FinishedMatch

}
