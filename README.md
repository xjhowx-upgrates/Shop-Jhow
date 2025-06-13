# Shop Jhow - E-commerce de Peças de Computador

Este é um projeto de e-commerce completo, construído com Next.js, Firebase e Stripe, simulando uma loja virtual de peças de computador.

## :sparkles: Funcionalidades

- Catálogo de produtos com busca e filtragem.
- Carrinho de compras com gerenciamento de estado via Redux.
- Autenticação de usuários (Login e Cadastro) com Firebase Auth.
- Checkout seguro e processamento de pagamentos com Stripe.
- Página "Meus Pedidos" para visualização do histórico de compras.
- Webhook para confirmação de pagamento e criação de pedidos no Firestore.
- Design responsivo para uma boa experiência em desktops e dispositivos móveis.

## :man_technologist: Tecnologias Utilizadas

- **Framework:** [Next.JS](https://nextjs.org/)
- **Linguagem:** [Typescript](https://www.typescriptlang.org/)
- **Estilização:** [SASS](https://sass-lang.com/) / CSS Modules
- **Gerenciamento de Estado:** [Redux](https://redux.js.org/) com [Redux Toolkit](https://redux-toolkit.js.org/)
- **Banco de Dados:** [Firebase Firestore](https://firebase.google.com/products/firestore)
- **Autenticação:** [Firebase Authentication](https://firebase.google.com/products/auth)
- **Pagamentos:** [Stripe](https://stripe.com/br)
- **Testes (Setup inicial):** [Cypress](https://www.cypress.io/)

---

## 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [Yarn](https://yarnpkg.com/) ou [NPM](https://www.npmjs.com/)
- Uma conta no [Firebase](https://firebase.google.com/) para configurar o banco de dados e a autenticação.
- Uma conta no [Stripe](https://stripe.com/br) para processar os pagamentos.
- [Stripe CLI](https://docs.stripe.com/stripe-cli) para testar webhooks localmente.

### 2. Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
# ou
yarn install
```

### 3. Variáveis de Ambiente

Crie um arquivo chamado `.env.local` na raiz do projeto, copiando o exemplo de `.env.example`. Preencha com suas próprias chaves do Firebase e Stripe.

```bash
# .env.local

# Firebase - Configurações do seu projeto no console do Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=SUA_CHAVE_DE_API
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=SEU_DOMINIO.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=SEU_ID_DE_PROJETO
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=SEU_BUCKET.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=SEU_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=SEU_APP_ID

# Stripe - Chaves encontradas no seu Dashboard do Stripe
STRIPE_PUBLIC_KEY=SUA_CHAVE_PUBLICA
STRIPE_SECRET_KEY=SUA_CHAVE_SECRETA

# Stripe Webhook - Gerado ao rodar 'stripe listen'
# Deixe em branco inicialmente
STRIPE_WEBHOOK_SECRET=
```

### 4. Scripts Disponíveis

- **Para iniciar o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
- **Para criar uma build de produção:**
    ```bash
    npm run build
    ```
- **Para iniciar o servidor em modo de produção:**
    ```bash
    npm run start
    ```
- **Para rodar os linters:**
    ```bash
    npm run lint
    ```

### 5. Testando o Webhook do Stripe

Para testar o fluxo de pagamento completo, o Stripe precisa enviar eventos para a sua máquina local.

1.  Inicie o servidor (`npm run dev`).
2.  Em um **novo terminal**, inicie o ouvinte do Stripe:
    ```bash
    stripe listen --forward-to localhost:3000/api/webhooks/stripe
    ```
3.  O comando acima irá gerar um **segredo de webhook** (ex: `whsec_...`). Copie esse valor e cole na variável `STRIPE_WEBHOOK_SECRET` em seu arquivo `.env.local`.
4.  **Reinicie o servidor de desenvolvimento** para que ele carregue a nova variável.
5.  Agora você pode realizar uma compra de teste usando os [cartões de teste do Stripe](https://docs.stripe.com/testing).

## :computer: Live Demo

Para visualização de uma versão demo do site clique [aqui](https://site-vendas-fake.vercel.app/).

---

## 👨‍💻 Créditos

Desenvolvido por **@xJhowx**.

---

## 👨‍💻 Créditos

Desenvolvido com ❤️ por **@xJhowx**.
