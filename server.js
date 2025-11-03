require("dotenv").config();
const express = require('express');
const cors = require('cors');

const cadastroRoutes = require("./src/routes/cadastro.routes");
const relatoriosRoutes = require("./src/routes/relatorios.routes");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(cadastroRoutes);
app.use(relatoriosRoutes);

app.listen(port, () => {
    console.log('Servidor online na ' + port);
})