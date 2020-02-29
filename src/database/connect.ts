import { createConnection, Connection } from "typeorm";

import * as entities from "../entities";

const createDatabaseConnection = (): Promise<Connection> =>
  createConnection({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT || 5432),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: Object.values(entities),
    synchronize: true
  });

const establishDatabaseConnection = async (): Promise<void> => {
  try {
    await createDatabaseConnection();
  } catch (error) {
    console.log(error);
  }
};

export default establishDatabaseConnection;
