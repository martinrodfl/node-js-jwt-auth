import Sequelize from "sequelize";
import dbConfig from "../config/db.config.js";
import tutorialModel from "./tutorial.model.js"; // Importa el modelo

// Configuración de Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false, // Ya no es necesario en las versiones modernas de Sequelize

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

// Asignación de Sequelize y sequelize a db
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Inicialización del modelo
db.tutorials = tutorialModel(sequelize, Sequelize);

// Exportación como ES Module
export default db;
