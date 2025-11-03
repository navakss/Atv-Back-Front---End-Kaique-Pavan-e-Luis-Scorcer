const jwt = require('jsonwebtoken');

const validaAdm = (req, res, next) => {
    const usuario = req.headers['user'];

    if (!usuario) {
        return res.status(400).json({ msg: "Usuário não informado no cabeçalho." });
    }

    const dados = typeof usuario === 'string' ? JSON.parse(usuario) : usuario;

    if (dados.cargo?.toLowerCase() === "administrador") {
        next();
    } else {
        res.status(401).end();
    }
};

const validaAdmOuMedico = (req, res, next) => {
    const usuario = req.headers['user'];

    if (!usuario) {
        return res.status(400).json({ msg: "Usuário não informado no cabeçalho." });
    }

    try {
        const dados = typeof usuario === 'string' ? JSON.parse(usuario) : usuario;
        const cargo = dados.cargo?.toLowerCase();

        if (cargo === "administrador" || cargo === "médico" || cargo === "medico") {
            next();
        } else {
            return res.status(401).end();
        }
    } catch (error) {
        console.error("Erro ao validar cargo:", error);
        return res.status(500).json({ msg: "Erro ao validar o cargo do usuário." });
    }
};

const validaAdmOuAtendente = (req, res, next) => {
    const usuario = req.headers['user'];

    if (!usuario) {
        return res.status(400).json({ msg: "Usuário não informado no cabeçalho." });
    }

    const dados = typeof usuario === 'string' ? JSON.parse(usuario) : usuario;
    const cargo = dados.cargo?.toLowerCase();

    if (cargo === "administrador" || cargo === "atendente") {
        next();
    } else {
        res.status(401).end();
    }
};

module.exports = {
    validaAdm,
    validaAdmOuMedico,
    validaAdmOuAtendente
};
