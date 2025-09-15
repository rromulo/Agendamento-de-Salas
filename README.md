# 🏢 Teste Técnico: Agendamento de Salas
 
O sistema é uma plataforma de agendamento de salas, com dois perfis de usuário:

- **Admin**
- **Cliente**

---

## 🚀 Funcionalidades

- **Autenticação**
  - Login para ambos os perfis.
  - Registro disponível para clientes.

- **CRUD de Salas**
  - Administradores podem criar salas.

- **Agendamentos**
  - Clientes podem agendar, visualizar e cancelar suas reservas.
  - Reservas passam por um fluxo de status: **PENDENTE, CONFIRMADO, RECUSADO**.

- **Logs**
  - Admins podem visualizar logs de todos os clientes.
  - Clientes veem apenas os próprios logs.

- **Gerenciamento de Clientes**
  - Administradores podem visualizar a lista de clientes e alterar permissões.

- **API de CEP**
  - Usada no registro e no perfil do cliente para preencher o endereço automaticamente.

---

## 🛠️ Stacks Utilizadas

### Backend
- [Node.js](https://nodejs.org/) – Ambiente de execução JavaScript.  
- [TypeScript](https://www.typescriptlang.org/) – Tipagem estática.  
- [Express](https://expressjs.com/) – Framework web para API REST.  
- [Sequelize](https://sequelize.org/) – ORM para banco de dados.  
- [MySQL](https://www.mysql.com/) – Banco de dados relacional.  
- [JWT](https://jwt.io/) – Autenticação e autorização.  
- [Docker](https://www.docker.com/) + Docker Compose – Orquestração de containers.  

### Frontend
- [Next.js](https://nextjs.org/) – Framework React.  
- [TypeScript](https://www.typescriptlang.org/).  
- [Tailwind CSS](https://tailwindcss.com/) – Estilização.  
- [Axios](https://axios-http.com/) – Cliente HTTP.  
- [js-cookie](https://github.com/js-cookie/js-cookie) – Gerenciamento de cookies.  
- [react-toastify](https://fkhadra.github.io/react-toastify/introduction) – Notificações.  

---

## ⚙️ Como Rodar o Projeto

### ✅ Pré-requisitos
- [Node.js](https://nodejs.org/) v18.x ou superior  
- [npm](https://www.npmjs.com/)  
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)  

---

### 1. Clonar o Repositório
```bash
git clone git@github.com:rromulo/Agendamento-de-Salas.git
cd Agendamento-de-Salas
```

Configurar Variáveis de Ambiente

### 2. Crie um arquivo .env no backend do projeto com as seguintes variáveis:
```bash
# Banco de Dados
DB_NAME=db_scheduling
DB_USER=root
DB_PASSWORD=root
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql

# Aplicação
PORT=3001
JWT_SECRET=sua_chave_secreta_aqui
```
### 3. Suba o banco de dados com Docker

Na pasta raiz do projeto, execute:

```bash
docker-compose up -d
```
Isso irá subir um container MySQL com os seguintes dados:

| Configuração | Valor       |
| ------------ | ----------- |
| Host         | `localhost` |
| Porta        | `3306`      |
| Database     | `db_scheduling`   |
| Usuário      | `root`     |
| Senha        | `root`     |


### 3. Instale as dependências

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---
#### 4. Frontend - crie o arquivo `.env` na pasta `frontend`:

```env
NEXT_PUBLIC_API_URL_V1=http://localhost:3001
```

---

### 5. Crie um admin manualmente

Você pode criar diretamente via banco.

---

### 6. Inicie os servidores

```bash
# No backend
cd backend
npm run dev

# Em outro terminal, no frontend
cd frontend
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:3001](http://localhost:3001)
