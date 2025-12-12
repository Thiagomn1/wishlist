# Wishlist

Aplicação de wishlist (lista de desejos) de produtos, desenvolvida com React no frontend e Express no backend.

## Estrutura do Projeto

```
wishlist/
├── frontend/     # Aplicação React + TypeScript + Vite
├── backend/      # API REST com Express + TypeScript
└── package.json  # Scripts para rodar testes e frontend/backend juntos
```

## Tecnologias

### Frontend

- **React 19** com TypeScript
- **Vite** - build tool rápido
- **React Router** - navegação entre páginas
- **Tailwind CSS** - estilização
- **Axios** - requisições HTTP
- **React Toastify** - notificações de sucesso/erro
- **React Icons** - ícones
- **Vitest + Testing Library** - testes unitários

### Backend

- **Express** com TypeScript
- **JSON como banco de dados** - armazenamento simples em arquivo

### Ferramentas

- **Concurrently** - roda frontend e backend simultaneamente com um único comando
- **ESLint + Prettier** - padronização de código

## Como Rodar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/Thiagomn1/wishlist.git
cd wishlist
```

2. Instale todas as dependências

```bash
npm run install:all
```

### Executando o projeto

**Rodar frontend e backend juntos:**

```bash
npm run dev
```

Isso vai iniciar:

- Backend em `http://localhost:3001`
- Frontend em `http://localhost:5173`

### Testes

```bash
# Rodar testes do frontend
npm run test:frontend

# Rodar com coverage
npm run test:frontend:coverage
```

### Build

```bash
# Build de produção (frontend + backend)
npm run build

# Build individual
npm run build:frontend
npm run build:backend
```

### Linting e Formatação

```bash
# Lint
npm run lint

# Format
npm run format
```

## Decisões Técnicas

### TailwindCSS

As instruções do teste não especificava a necessidade de CSS puro, SASS ou derivados, então o Tailwind foi escolhido pela agilidade no desenvolvimento e facilidade de criar layouts responsivos sem sair do JSX.

### Axios

Axios oferece uma API mais limpa que fetch nativo, com suporte para transformação automática de JSON.

### Por que JSON como banco de dados?

Sendo o foco do teste o Frontend, um arquivo JSON foi escolhido para simplificar a API e evitar a necessidade de subir um banco de dados dedicado para a aplicação. Um JSON já a Permite persistência simples e supre as necessidades do projeto.

### Testes

Os testes cobrem componentes, páginas e serviços. Usamos mocks para isolar a lógica e garantir que cada unidade funcione independentemente.
