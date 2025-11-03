const db = require("../data/connection");

const consultasPorEspecialidade = async (req, res) => {
    try {
        const relatorio = await db.query(`
            SELECT 
                e.especialidade,
                COUNT(c.id_consulta) AS total_consultas
            FROM consultas c
            JOIN equipe e ON c.id_medico = e.id_equipe
            WHERE e.cargo = 'Médico'
            GROUP BY e.especialidade
            ORDER BY total_consultas DESC;
        `);

        res.status(200).json(relatorio[0]);
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
};

const pacientesPorMedico = async (req, res) => {
    try {
        const pacientes = await db.query(`
            SELECT 
                e.id_equipe AS id_medico,
                e.nome AS nome_medico,
                e.especialidade,
                COUNT(DISTINCT c.id_paciente) AS total_pacientes
            FROM consultas c
            JOIN equipe e ON c.id_medico = e.id_equipe
            WHERE e.cargo = 'Médico'
            GROUP BY e.id_equipe, e.nome, e.especialidade
            ORDER BY total_pacientes DESC;
        `);

        res.status(200).json(pacientes[0]);
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
};

const listarConsultasGerais = async (req, res) => {
    try {
        const listar = await db.query(`
            SELECT 
                c.id_consulta,
                p.nome AS nome_paciente,
                e.nome AS nome_medico,
                e.especialidade,
                c.data_consulta,
                c.status
            FROM consultas c
            JOIN pacientes p ON c.id_paciente = p.id_paciente
            JOIN equipe e ON c.id_medico = e.id_equipe
            WHERE e.cargo = 'Médico'
            ORDER BY c.data_consulta DESC;
        `);

        res.status(200).json(listar[0]);
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
};

module.exports = {
    consultasPorEspecialidade,
    pacientesPorMedico,
    listarConsultasGerais
};
