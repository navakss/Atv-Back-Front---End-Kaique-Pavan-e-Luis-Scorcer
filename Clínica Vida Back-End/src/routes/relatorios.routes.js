const express = require('express');
const relatoriosController = require('../controllers/relatorios.controller');
const { validaAdm, validaAdmOuMedico } = require('../middlewares/validaCargo');
const validate = require('../middlewares/auth');

const relatoriosRoutes = express.Router();

relatoriosRoutes.get('/especialidades',validate, validaAdm, relatoriosController.consultasPorEspecialidade);
relatoriosRoutes.get('/pacientes/medico', validate, validaAdmOuMedico, relatoriosController.pacientesPorMedico);
relatoriosRoutes.get('/consultas/geral', validate, validaAdm, relatoriosController.listarConsultasGerais);

module.exports = relatoriosRoutes;