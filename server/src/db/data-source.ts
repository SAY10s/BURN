import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Character } from "./entity/Character";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
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
