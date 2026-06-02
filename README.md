# 🚀 Erika - Backend (Marketplace de Serviços de Tecnologia)

API RESTful desenvolvida para o **Erika**, uma plataforma de marketplace de serviços focada em tecnologia (modelo Fiverr), conectando Contratantes e Provedores (Freelancers).

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com uma stack moderna, focada em tipagem estática, segurança e performance:

* **Node.js & Express:** Servidor web rápido e minimalista.
* **TypeScript:** Tipagem estática para maior segurança e previsibilidade do código.
* **SQLite:** Banco de dados relacional leve e embutido.
* **Drizzle ORM:** Ferramenta moderna e type-safe para modelagem e consultas ao banco de dados.
* **Zod:** Validação rigorosa de dados (DTOs) na entrada da API.
* **JSON Web Token (JWT) & Bcrypt:** Autenticação segura, geração de tokens e criptografia de senhas.
* **CORS:** Configurado para integração segura com o Front-end.

## ⚙️ Funcionalidades Implementadas (Fase 1)

* [x] **Modelagem do Banco de Dados:** Estrutura relacional (`erika.db`) preparada para expansão (Usuários, Serviços, Chats, Mensagens).
* [x] **Cadastro de Usuários (Sign Up):** Validação de dados e hash de senhas. Diferenciação de papéis (`contratante` vs `provedor`).
* [x] **Autenticação (Sign In):** Verificação de credenciais e emissão de tokens JWT (Stateless authentication).
* [x] **Integração Front-end:** Políticas de CORS configuradas para comunicação com a interface em React/Vite.

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* Node.js (v18+ recomendado)
* Gerenciador de pacotes (npm ou pnpm)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd projeto-web-backend

2. **Instale as dependências:**

   ```bash

   npm install

3. **Crie e popule o banco de dados SQLite:**

   ```bash

   npx drizzle-kit push


4. **Inicie o servidor de desenvolvimento:**

   ```bash

    npx tsx watch src/index.ts
