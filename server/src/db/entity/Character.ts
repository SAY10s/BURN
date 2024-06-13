import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  jestBohaterem: boolean;

  @Column({ default: "Anonimowy" })
  imie: string;

  @Column({ default: 10 })
  pz: number;

  @Column({ default: 10 })
  pzMax: number;

  @Column({ default: 10 })
  fart: number;

  @Column({ default: 10 })
  fartMax: number;

  @Column({ default: 10 })
  pw: number;

  @Column({ default: 10 })
  pwMax: number;

  @Column({ default: 1 })
  wigor: number;

  @Column("json", { default: {} })
  wyparowanie: {
    [key: string]: { wyparowanie: number; wyparowanieMax: number };
  };

  @Column("json", { default: {} })
  szanse: { [key: string]: number };

  @Column("json", { default: [] })
  ataki: {
    nazwa: string;
    kosztPW: number;
    kosztWigor: number;
    ileD6: number;
    dodatkowyDMG: number;
    nazwaStatystyki: string;
    mozliweSposobyUniku: string[];
    srebrnyAtak: boolean;
    procentSzansNaPodpalenie: number;
    procentSzansNaKrwawienie: number;
  }[];
}
