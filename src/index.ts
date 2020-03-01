import "dotenv/config";
import "reflect-metadata";
import createDatabaseConnection from "./database/connect";
import initializeApp from "./app";

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

const main = async () => {
  await createDatabaseConnection();

  const app = initializeApp();

  const { PORT = 3000 } = process.env;

  app.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}`)
  );
};

main();
