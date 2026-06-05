# Frontend — desafioTecnico

## Arquitetura

```
[Frontend] → BFF → Backend → PostgreSQL
```

Fala só com o BFF — nunca com o Backend diretamente.

---

## Stack

- React 18 / Vite 6
- React Hook Form
- React Router DOM 6
- Axios

---

## Decisões

**React Hook Form:** validação integrada por campo, sem re-render a cada tecla, menos boilerplate que controlar estado manualmente.

**JWT no localStorage:** tradeoff conhecido — `httpOnly cookie` seria mais seguro contra XSS, mas exigiria mais configuração de CORS/credentials. Para o escopo do case ficou ok.

**CEP automático:** ao digitar o CEP, chama `GET /api/address/{cep}` no BFF que consulta o ViaCEP. Logradouro, bairro, cidade e UF preenchem sozinhos.

---

## Funcionalidades

- Formulário de cadastro com máscaras de CPF e CEP
- Preenchimento automático de endereço via CEP
- Validação de campos no cliente antes do envio
- Exibição do login gerado após cadastro bem-sucedido
- Login com o login gerado + autenticação JWT
- Listagem de todas as pessoas (rota protegida)

---

## Hospedagem

Cloudflare Pages — free tier, CDN global, deploy automático no push para `main`.
