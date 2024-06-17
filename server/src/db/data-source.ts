import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Character as CharacterDB } from "./entity/Character";
import { Character } from "./entity/Character";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "admin",
  password: "admin",
  database: "burn",
  synchronize: true,
  logging: false,
  entities: [User, Character],
  migrations: [],
  subscribers: [],
});
export async function getAllCharacters() {
  const characters = await AppDataSource.manager.find(CharacterDB);
  return characters;
}
