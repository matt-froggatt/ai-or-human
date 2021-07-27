import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

export enum MediaType {
    AUDIO = "audio",
    VIDEO = "video",
    IMAGE = "image"
}

export enum MediaGenre {
    GOOD = "good",
    BAD = "bad"
}

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    link: string

    @Column("bool")
    isAIMade: boolean

    @Column({
        type: "enum",
        enum: MediaType
    })
    type: MediaType

    @Column({
        type: "enum",
        enum: MediaGenre
    })
    genre: MediaGenre
}