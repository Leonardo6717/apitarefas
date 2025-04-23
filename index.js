const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURL = process.env.DATABASE_URL; // Agora usando variável de ambiente

// Middleware CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "HEAD, GET, POST, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use('/api', routes);

// Conexão com MongoDB
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', (error) => console.error('Erro na conexão com o banco:', error));
db.once('connected', () => console.log('✅ Database Connected'));

// Iniciando servidor
app.listen(PORT, () => {
  console.log(`🚀 Server Started at port ${PORT}`);
});


