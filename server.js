import express from "express";
import cors from "cors";
import db from "./app/models/index.js"; // Asegúrate de usar la extensión .js para los módulos ES
import tutorialRoutes from "./app/routes/tutorial.routes.js"; // Usa la ruta correcta para los módulos

const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // Parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // Parse requests of content-type - application/x-www-form-urlencoded

// Sincronización de la base de datos
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Rutas
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

tutorialRoutes(app); // Importa y utiliza las rutas

// Configuración del puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
