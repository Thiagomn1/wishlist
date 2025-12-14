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

3. Adicionar .env

```bash
cd backend
cp .env.example .env
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

As instruções do teste não especificava o uso de CSS puro, SASS ou derivados, então decidi seguir com o Tailwind pela agilidade no desenvolvimento e facilidade de criar layouts responsivos sem sair do JSX.

### Axios

Axios oferece uma API mais limpa que fetch nativo, com suporte de transformação automática para JSON.

### JSON como banco de dados

Sendo o foco do teste o Frontend, escolhi um arquivo JSON como persistência de dados para simplificar a API e evitar a necessidade de subir um banco de dados dedicado para a aplicação, já suprindo a necessidade do projeto.

### Testes

Os testes cobrem componentes, páginas e serviços. Utilizando mocks para isolar a lógica e garantir que cada um funcione independentemente. Não realizei testes na API por se tratar apenas de um mock para buscar e adicionar/remover produtos em um JSON.

### Design/CSS

Algumas decisões que tive durante o design das páginas:

- Na lista de produtos, o PDF na página home, os cards estão centralizados na página, enquanto na seção da wishlist em uma das imagens eles estão alinhados a esquerda enquanto na outra imagem a wishlist está centralizada novamente. Decidi seguir com os cards padronizados e estando centralizados na página mas com os itens começando pela esquerda.
- Também na página de wishlist, em uma imagem o ícone de remover está com o X enquanto na outra ele está com o coração vermelho/cinza igual a home, por questões de consistência e melhor indicação do tipo de ação que o botão faz na wishlist, decidi seguir com o X na wishlist enquanto a home tem o coração de adicionar/remover.
- No geral, tentei replicar as páginas o mais próximo possível do design fornecido, apesar de não ter valores de CSS como margens e paddings exatas como em um design do Figma.
