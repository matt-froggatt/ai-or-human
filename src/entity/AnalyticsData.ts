import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, ManyToOne } from "typeorm"
import { Media } from "./Media"

@Entity()
export class AnalyticsData {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Media)
    @JoinColumn()
    selectedMedia: Media

    @ManyToOne(type => Media)
    @JoinColumn()
    unselectedMedia: Media
}