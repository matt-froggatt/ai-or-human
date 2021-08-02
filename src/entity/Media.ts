import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

export enum MediaType {
    AUDIO = "AUDIO",
    VIDEO = "VIDEO",
    IMAGE = "IMAGE"
}

export enum MediaGenre {
    ABSTRACT = 'ABSTRACT',
    ABSTRACT_PORTRAIT = 'ABSTRACT_PORTRAIT',
    ALAN_JACKSON = "ALAN_JACKSON",
    BLUEGRASS = "BLUEGRASS",
    BOB_MARLEY = "BOB_MARLEY",
    BRUNO_MARS = "BRUNO_MARS",
    CHOPIN = "CHOPIN",
    CLASSICAL = "CLASSICAL",
    COUNTRY = 'COUNTRY',
    DARK = 'DARK',
    DAVID_BOWIE = "DAVID_BOWIE",
    EAGLES = "EAGLES",
    ELVIS_PRESLEY = "ELVIS_PRESLEY",
    FRANK_SINATRA = "FRANK_SINATRA",
    JAZZ = "JAZZ",
    JOE_BONAMASSA = "JOE_BONAMASSA",
    JOURNEY = "JOURNEY",
    KANYE_WEST = "KANYE_WEST",
    KATY_PERRY = "KATY_PERRY",
    KYLIE_MINOGUE = "KYLIE_MINOGUE",
    LANDSCAPE = 'LANDSCAPE',
    NAS = "NAS",
    PIANO = "PIANO",
    POP = "POP",
    PORTRAIT = 'PORTRAIT',
    RACHMANINOFF = "RACHMANINOFF",
    RAGE = "RAGE",
    RANDOM = 'RANDOM',
    RICK_ASTLEY = "RICK_ASTLEY",
    TWOPAC = "TWOPAC",
    WOLFGANG_MOZART = "WOLFGANG_MOZART"
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