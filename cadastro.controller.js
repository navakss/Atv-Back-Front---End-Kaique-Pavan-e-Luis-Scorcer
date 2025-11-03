const db = require("../data/connection");
const jsonwebtoken = require("jsonwebtoken");
const crypto = require('node:crypto');

const login = async(req, res) => {
    const { email, senha } = req.body;
    
    try {
        const senhahash = crypto.createHash('MD5').update(senha).digest('hex').toString();

        const usuario = await db.query("SELECT * FROM equipe WHERE email = ? AND senha = ?", [email, senha]);

        if(usuario[0].length === 0) res.status(401).send({msg:'E-mail or Password incorrect !'});

        const token = jsonwebtoken.sign(
            {
                id: usuario[0][0].id_equipe,
                nome: usuario[0][0].nome,
                cargo: usuario[0][0].cargo
            },
            process.env.SECRET_JWT, 
            { expiresIn: "120min" }
        );

        res.status(200).json({ token : token }).end();
    }catch(error) {
        res.status(500).send(error).end();
    }
}

const cadastrarMedico = async (req, res) => {
  try {
    const { nome, email, senha, cargo, especialidade } = req.body;

    if (cargo.toLowerCase() !== "médico" && cargo.toLowerCase() !== "medico") {
      return res.status(400).json({ msg: "O cargo deve ser 'Médico' para cadastrar especialidade." });
    }

    const registrarMedico = await db.query(
      "INSERT INTO equipe (nome, email, senha, cargo, especialidade) VALUES (?, ?, ?, ?, ?)", [nome, email, senha, cargo, especialidade]
    );

    const novoMedico = {
      id_equipe: registrarMedico[0].insertId,
      nome,
      email,
      cargo,
      especialidade
    };

    res.status(201).json(novoMedico);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};


const cadastrarPaciente = async (req, res) => {
  try {
    const { nome, cpf, data_nascimento, telefone, email } = req.body;

    const registrarPaciente = await db.query(
      "INSERT INTO pacientes (nome, cpf, data_nascimento, telefone, email, data_cadastro) VALUES (?, ?, ?, ?, ?, NOW())", [nome, cpf, data_nascimento, telefone, email]
    );

    const novoPaciente = {
      id_paciente: registrarPaciente.insertId,
      nome,
      cpf,
      data_nascimento,
      telefone,
      email
    };

    res.status(201).json(novoPaciente);
  } catch (error) {
    console.error("Erro ao cadastrar paciente:", error);
    res.status(500).end();
  }
};


const agendarConsulta = async (req, res) => {
  try {
    const { id_medico, id_paciente, status, data, hora } = req.body;

    const horaFormatada = hora.replace('Z', '');

    const dataHoraConsulta = `${data} ${horaFormatada}`;

    const agora = new Date();
    const dataHoraDate = new Date(dataHoraConsulta);
    if (dataHoraDate < agora) {
      return res.status(400).json({
        msg: "A data e hora da consulta não podem ser anteriores ao momento atual."
      });
    }

    const [consultasExistentes] = await db.query(
      `SELECT * FROM consultas 
       WHERE id_medico = ? AND id_paciente = ? AND data_consulta = ?`, [id_medico, id_paciente, dataHoraConsulta]
    );

    if (consultasExistentes.length > 0) {
      return res.status(400).json({
        msg: "Já existe uma consulta deste paciente com este médico nesta data e hora."
      });
    }

    const registrarConsulta = await db.query(
      `INSERT INTO consultas (id_paciente, id_medico, status, data_consulta) VALUES (?, ?, ?, ?)`, [id_paciente, id_medico, status, dataHoraConsulta]
    );

    const novaConsulta = {
      id: registrarConsulta.insertId,
      id_medico,
      id_paciente,
      status,
      data_consulta: dataHoraConsulta
    };

    res.status(201).json(novaConsulta);

  } catch (error) {
    console.error("Erro ao agendar consulta:", error);
    res.status(500).end();
  }
};




module.exports = {
    login,
    cadastrarMedico,
    cadastrarPaciente,
    agendarConsulta
}