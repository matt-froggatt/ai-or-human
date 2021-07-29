import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

export enum MediaType {
    AUDIO = "AUDIO",
    VIDEO = "VIDEO",
    IMAGE = "IMAGE"
}

export enum MediaGenre {
    GOOD = "GOOD",
    BAD = "BAD"
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