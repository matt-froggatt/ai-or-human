import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
import { Media } from "./Media"

@Entity()
export class AnalyticsData {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(type => Media)
    @JoinColumn()
    selectedMedia: Media

    @OneToOne(type => Media)
    @JoinColumn()
    unselectedMedia: Media
}