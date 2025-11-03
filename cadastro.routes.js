const cadastroController = require('../controllers/cadastro.controller');

const express = require('express');
const validate = require('../middlewares/auth');
const { validaAdmOuAtendente } = require('../middlewares/validaCargo');

const cadastroRoutes = express.Router();

cadastroRoutes.get('/login', cadastroController.login);
cadastroRoutes.post('/register/medico', validate, validaAdmOuAtendente, cadastroController.cadastrarMedico);
cadastroRoutes.post('/register/paciente', validate, validaAdmOuAtendente, cadastroController.cadastrarPaciente);
cadastroRoutes.post('/register/consulta', validate, validaAdmOuAtendente, cadastroController.agendarConsulta);

module.exports = cadastroRoutes;