const { Sequelize } = require("sequelize");

const DB_URL = `${process.env.PG_CONNECTION_STRING}/${process.env.DB3}`;

const db = new Sequelize(DB_URL, {
  dialect: "postgres",
  logging: false, 

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },

  define: {
    timestamps: true, 
    freezeTableName: true, 
  }
});

async function testDB() {
  try {
    await db.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Unable to connect:", error);
  }
}

module.exports = {db, testDB};
