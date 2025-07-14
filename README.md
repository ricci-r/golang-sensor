# Sensor App — NATS, Backend (Go) e Frontend (React + TailwindCSS)

## 📦 Estrutura do Projeto

```
├── sensor-backend        # Backend em Go
│   ├── main.go           # Ponto de entrada
│   ├── handlers/         # Handlers HTTP
│   ├── models/           # Modelos de dados
│   └── nats/             # Cliente NATS
└── sensor-frontend       # Frontend React com TailwindCSS
    └── src/components/   # Componentes da UI
```

---

## 🚀 Como Executar a Aplicação

### 🔁 1. Inicie o Servidor NATS

#### Com Docker (recomendado)
```bash
docker run -p 4222:4222 -p 8222:8222 nats:latest
```

- A porta `4222` é usada pelo cliente NATS.
- A porta `8222` é usada para monitoramento (opcional).

#### Sem Docker
Baixe o [NATS Server](https://docs.nats.io/running-a-nats-service/introduction/installation) e execute:

```bash
nats-server
```

---

### 🧠 2. Inicie o Backend (Go)

#### Pré-requisitos:
- Go 1.18 ou superior

#### Passos:
```bash
cd sensor-backend
go mod download
```

Crie um arquivo `.env` ou exporte as variáveis:

```bash
export NATS_URL=nats://localhost:4222
export PORT=8080
```

Inicie o servidor:
```bash
go run main.go
```

O backend estará em: `http://localhost:8080`

---

### 🎨 3. Inicie o Frontend (React + TailwindCSS)

#### Pré-requisitos:
- Node.js 18+

#### Passos:
```bash
cd sensor-frontend
npm install
```

Crie um arquivo `.env` com a URL da API:
```env
REACT_APP_BACKEND_URL=http://localhost:8080
```

Inicie o frontend:
```bash
npm start
```

O frontend estará em: `http://localhost:3000`

---

## 🛠️ Tecnologias Usadas

- **NATS**: Broker de mensagens (Pub/Sub)
- **Go**: Backend leve e eficiente
- **React**: Frontend reativo e rápido
- **TailwindCSS**: Estilização rápida e responsiva

---

## 📋 Observações

- Certifique-se de que o NATS esteja ativo antes de iniciar o backend.
- O frontend se comunica com o backend via REST, e o backend com o NATS.
- O arquivo `natsClient.js` no frontend pode ser usado para testes, mas a comunicação real é via backend.

---

## ✅ Funcionalidades

- Listagem e cadastro de sensores
- Comunicação via NATS entre frontend e backend
- Interface responsiva com TailwindCSS

---

## 📄 Licença

Este projeto está sob a licença MIT.
