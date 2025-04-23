require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;
const mongoURL = process.env.DATABASE_URL;

// ✅ Middleware CORS (corretamente posicionado)
app.use(cors({
  origin: ['https://frontend-lake-tau-17.vercel.app', 'http://localhost:4200'],
  credentials: true
}));

// ✅ Middleware para JSON
app.use(express.json());

// ✅ Rotas da API
app.use('/api', routes);

// ✅ Conexão com MongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', (error) => console.error('❌ Erro na conexão com o banco:', error));
db.once('connected', () => console.log('✅ MongoDB conectado com sucesso'));

// ✅ Iniciando servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});