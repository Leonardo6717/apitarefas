const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Configurar o CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

// Porta
const PORT = process.env.PORT || 3000;

// Rotas
const routes = require('./routes/routes');
app.use('/api', routes);

// Conectar ao MongoDB
const connectionString = process.env.DATABASE_URL || "mongodb+srv://Leonardo237097:LeoGabi261123@cluster0.ou53edn.mongodb.net/tarefasDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connectionString)
  .then(() => {
    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server Started at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Erro na conexão com o MongoDB:", error);
  });

