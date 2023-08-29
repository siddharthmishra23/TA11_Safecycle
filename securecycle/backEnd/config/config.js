import "dotenv/config";

const config = {
  db: {
    host: "cyclestreet.mysql.database.azure.com",
    user: process.env.AZURE_USERNAME,
    password: process.env.AZURE_PASSWORD,
    database: "cycledatabase",
    connectTimeout: 60000,
  },
};

export default config;
