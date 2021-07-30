const Sequelize = require("sequelize");

const options = {
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

if (process.env.NODE_ENV === "production") {
  options.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER_LOGIN,
  process.env.DB_USER_PASSWORD,
  options
);

module.exports = sequelize;
