# 📦 Projeto MVC Básico em Node.js

Este é um projeto simples demonstrando a estrutura de arquitetura **MVC (Model-View-Controller)** com Node.js e Express. Ele implementa um CRUD completo de usuários com persistência em arquivo JSON.

---

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express 5.1.0** - Framework web minimalista
- **File System (fs)** - Persistência em arquivo JSON

---

## 📁 Estrutura de pastas

```
projeto-mvc/
├── app.js                    # Servidor principal
├── package.json             # Dependências e scripts
├── data/
│   └── userData.json        # Arquivo de dados dos usuários
└── src/
    ├── controllers/
    │   └── userController.js # Lógica de controle
    ├── models/
    │   └── userModel.js     # Modelo de dados e CRUD
    ├── routes/
    │   └── userRoutes.js    # Definição das rotas
    └── utils/
        └── emailHelper.js   # Utilitários para validação
```

---

## ⚡ Funcionalidades

- ✅ **CREATE** - Criar novos usuários
- ✅ **READ** - Listar todos os usuários ou buscar por ID
- ✅ **UPDATE** - Atualizar dados de usuários
- ✅ **DELETE** - Remover usuários por ID
- 🔐 **Validações** - Email único e campos obrigatórios
- 💾 **Persistência** - Dados salvos em arquivo JSON

---

## ▶️ Como rodar o projeto

### 1. Clone o repositório
```bash
git clone <https://github.com/mathauscm/roadmapjs/tree/main/projeto-mvc>
cd projeto-mvc
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Inicie o servidor
```bash
npm start
# ou
node app.js
```

A aplicação estará disponível em: **http://localhost:3000**

---

## 🧪 Testando a API

### 📋 Listar todos os usuários
```bash
curl http://localhost:3000/users
```

**Resposta:**
```json
[
  {
    "id": "01",
    "name": "Mathaus",
    "email": "mathaus@email.com",
    "createdAt": "14/06/2025, 01:43:54"
  }
]
```

### ➕ Criar novo usuário
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Ana Silva", "email": "ana@email.com"}'
```

**Resposta:**
```json
{
  "id": "06",
  "name": "Ana Silva",
  "email": "ana@email.com",
  "createdAt": "16/06/2025, 16:29:12"
}
```

### 🔍 Buscar usuário por ID
```bash
curl http://localhost:3000/users/01
```

**Resposta:**
```json
{
  "id": "01",
  "name": "Mathaus",
  "email": "mathaus@email.com",
  "createdAt": "14/06/2025, 01:43:54"
}
```

### ✏️ Atualizar usuário
```bash
curl -X PUT http://localhost:3000/users/07 \
  -H "Content-Type: application/json" \
  -d '{"name": "Mathaus Carvalho", "email": "mathaus.novo@email.com"}'
```

**Resposta:**
```json
{
  "id": "01",
  "name": "Mathaus Silva",
  "email": "mathaus.novo@email.com",
  "createdAt": "14/06/2025, 01:43:54",
  "updatedAt": "16/06/2025, 20:15:30"
}
```

### 🗑️ Deletar usuário
```bash
curl -X DELETE http://localhost:3000/users/06
```

**Resposta:**
```json
{
  "id": "01",
  "name": "Mathaus",
  "email": "mathaus@email.com",
  "createdAt": "14/06/2025, 01:43:54"
}
```

---

## 🎯 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/users` | Lista todos os usuários |
| `GET` | `/users/:id` | Busca usuário por ID |
| `POST` | `/users` | Cria novo usuário |
| `PUT` | `/users/:id` | Atualiza usuário por ID |
| `DELETE` | `/users/:id` | Remove usuário por ID |

---

## 🔧 Validações Implementadas

- **Nome obrigatório** - Campo `name` não pode estar vazio
- **Email obrigatório** - Campo `email` não pode estar vazio
- **Email único** - Não permite emails duplicados
- **Formato de email** - Validação de formato válido
- **ID automático** - Geração automática de IDs sequenciais
- **Timestamp** - Data/hora de criação e atualização automática
- **Normalização** - Emails convertidos para lowercase e dados trimados

---

## 📊 Exemplo de Dados

O arquivo `data/userData.json` contém dados de exemplo:

```json
[
  {
    "id": "01",
    "name": "Mathaus",
    "email": "mathaus@email.com",
    "createdAt": "14/06/2025, 01:43:54"
  },
  {
    "id": "02",
    "name": "Ana Márcia",
    "email": "anamarcia@email.com",
    "createdAt": "14/06/2025, 01:43:54"
  }
]
```

---

## 🏗️ Arquitetura MVC

### **Model** (`userModel.js`)
- Gerencia os dados dos usuários
- Implementa operações CRUD completas
- Controla persistência em arquivo JSON
- Executa todas as validações de negócio

### **View** (API JSON)
- Retorna dados em formato JSON
- Interface RESTful para clientes

### **Controller** (`userController.js`)
- Processa requisições HTTP
- Coordena Model e View
- Trata erros e retorna status HTTP apropriados

### **Utils** (`emailHelper.js`)
- Funções auxiliares para validação de email
- Normalização de dados
- Reutilização de código

---

## 🚧 Próximas Funcionalidades

- [ ] Paginação para listagem de usuários
- [ ] Filtros de busca (nome, email)
- [ ] Middleware de autenticação
- [ ] Rate limiting
- [ ] Testes automatizados
- [ ] Documentação com Swagger
- [ ] Logging estruturado

---

## 📌 Observações Importantes

- ✅ **Persistência:** Os dados são salvos em arquivo JSON e **persistem** após reiniciar o servidor
- 🔒 **Validações:** Sistema previne emails duplicados e campos obrigatórios
- 🆔 **IDs automáticos:** Geração sequencial com padding de zeros (01, 02, 03...)
- 🕒 **Timestamps:** Data/hora de criação em formato brasileiro

---

## 📝 Scripts Disponíveis

```bash
npm start    # Inicia o servidor
npm test     # Executa testes (em desenvolvimento)
```

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT** - veja o arquivo LICENSE para detalhes.

---

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

**Desenvolvido para aprendizado de Node.js e padrão MVC**