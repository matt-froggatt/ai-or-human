import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

export enum MediaType {
    AUDIO = "AUDIO",
    VIDEO = "VIDEO",
    IMAGE = "IMAGE"
}

export enum MediaGenre {
    TWOPAC = "TWOPAC",
    ALAN_JACKSON = "ALAN_JACKSON",
    BLUEGRASS = "BLUEGRASS",
    BOB_MARLEY = "BOB_MARLEY",
    JOE_BONAMASSA = "JOE_BONAMASSA",
    BRUNO_MARS = "BRUNO_MARS",
    CHOPIN = "CHOPIN",
    DAVID_BOWIE = "DAVID_BOWIE",
    EAGLES = "EAGLES",
    ELVIS_PRESLEY = "ELVIS_PRESLEY",
    FRANK_SINATRA = "FRANK_SINATRA",
    JAZZ = "JAZZ",
    KANYE_WEST = "KANYE_WEST",
    KATY_PERRY = "KATY_PERRY",
    KYLIE_JENNER = "KYLIE_JENNER",
    NAS = "NAS",
    PIANO = "PIANO",
    POP = "POP",
    RACHMANINOFF = "RACHMANINOFF",
    RAGE = "RAGE",
    RICK_ASTLEY = "RICK_ASTLEY",
    CLASSICAL = "CLASSICAL",
    COUNTRY = "COUNTRY",
    JOURNEY = "JOURNEY",
    MOZART = "MOZART"
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

    @Column("text")
    genre: MediaGenre
}