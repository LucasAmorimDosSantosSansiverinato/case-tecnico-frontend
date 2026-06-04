# Frontend — desafioTecnico

## Posição na Arquitetura

```
[Frontend] → BFF → Backend → PostgreSQL
```

O Frontend é a interface do usuário. Comunica-se exclusivamente com o BFF — nunca acessa o Backend ou o banco diretamente.

## Stack

- React 18 / Vite 6
- React Router DOM 6
- React Hook Form
- Axios
- ESLint configurado com plugins React

## Funcionalidades

- **Cadastro de pessoa** — formulário com preenchimento automático do endereço ao digitar o CEP (via ViaCEP)
- **Login** — autenticação pelo login gerado no cadastro; recebe JWT do BFF
- **Perfil** — exibe dados da pessoa autenticada
- **Listagem** — visualiza todos os cadastros (requer autenticação)

## Segurança (JWT)

- Após login, o JWT é armazenado no `localStorage`
- Toda requisição ao BFF inclui `Authorization: Bearer <token>` automaticamente
- Token expirado é detectado no cliente e redireciona para `/login`
- Resposta 401 do BFF também força logout automático

## Hospedagem

Produção: **Cloudflare Pages** — deploy automático via GitHub Actions no push para `main`.

## Como Rodar Localmente

> Comece pelo projeto **Case-Tecnico** (migration) que sobe toda a infraestrutura.

```bash
# 1. Sobe banco, migrations, backend e BFF
cd Case-Tecnico && docker compose up

# 2. Sobe o frontend
cd case-tecnico-frontend
npm install
npm run dev
```

Disponível em `http://localhost:5173`

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia em modo desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run lint` | Verifica problemas com ESLint |
| `npm run lint:fix` | Corrige problemas automaticamente |

## Variáveis de Ambiente

| Variável | Descrição | Padrão local |
|---|---|---|
| `VITE_BFF_URL` | URL do BFF | `http://localhost:3001` |

Copie `.env.example` para `.env`.
