let consultas = [];

async function carregarConsultas() {
  try {
    const response = await fetch("dadosConsultas.txt");
    const texto = await response.text();
    consultas = JSON.parse(texto);
  } catch (erro) {
    console.warn("⚠️ Não foi possível carregar o arquivo, usando dados locais de exemplo.");
    consultas = [
      {
        "id": 1,
        "paciente_nome": "Ana Costa",
        "telefone": "(11) 99999-1234",
        "medico_nome": "Dra. Camila",
        "especialidade": "Cardiologia",
        "data": "2024-09-25",
        "hora": "14:00",
        "status": "agendada"
      },
      {
        "id": 2,
        "paciente_nome": "Bruno Lima",
        "telefone": "(11) 98888-5678",
        "medico_nome": "Dr. José",
        "especialidade": "Dermatologia",
        "data": "2024-09-26",
        "hora": "10:00",
        "status": "realizada"
      },
      {
        "id": 3,
        "paciente_nome": "Carla Souza",
        "telefone": "(11) 97777-9999",
        "medico_nome": "Dra. Camila",
        "especialidade": "Cardiologia",
        "data": "2024-09-27",
        "hora": "16:00",
        "status": "cancelada"
      },
      {
        "id": 4,
        "paciente_nome": "Diego Martins",
        "telefone": "(11) 96666-0000",
        "medico_nome": "Dr. José",
        "especialidade": "Dermatologia",
        "data": "2024-09-28",
        "hora": "09:00",
        "status": "agendada"
      }
    ];
  }

  mostrarTotais();
}

carregarConsultas();

function mostrarTotais() {
  const totalGeral = consultas.length;
  document.getElementById("total-geral").textContent = totalGeral;

  const porStatus = {};
  consultas.forEach(c => {
    porStatus[c.status] = (porStatus[c.status] || 0) + 1;
  });

  document.getElementById("total-status").textContent = Object.keys(porStatus).length;

  const listaStatus = document.getElementById("lista-status");
  listaStatus.innerHTML = "";
  for (const status in porStatus) {
    const li = document.createElement("li");
    li.textContent = `${status.charAt(0).toUpperCase() + status.slice(1)}: ${porStatus[status]}`;
    listaStatus.appendChild(li);
  }

  const porEspecialidade = {};
  consultas.forEach(c => {
    porEspecialidade[c.especialidade] = (porEspecialidade[c.especialidade] || 0) + 1;
  });

  document.getElementById("total-especialidade").textContent = Object.keys(porEspecialidade).length;

  const listaEsp = document.getElementById("lista-especialidade");
  listaEsp.innerHTML = "";
  for (const esp in porEspecialidade) {
    const li = document.createElement("li");
    li.textContent = `${esp}: ${porEspecialidade[esp]}`;
    listaEsp.appendChild(li);
  }
}
