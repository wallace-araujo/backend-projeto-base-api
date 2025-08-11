# Projeto API - Hapi.js

Este projeto foi desenvolvido utilizando **Hapi.js**, um framework Node.js maduro e modularizado, com foco em escalabilidade e boas práticas.  
O objetivo é fornecer uma API bem estruturada, com documentação acessível e arquitetura organizada.
**[https://hapi.dev/](https://hapi.dev/)**
---

## 📚 Documentação da API
Após iniciar o projeto, a documentação estará disponível em:  
**[http://localhost:3000/documentation](http://localhost:3000/documentation)**

---

## Pré-requisitos
Antes de começar, garanta que você tenha instalado:
- **Node.js** `>= 18` (recomendado utilizar [NVM](https://github.com/nvm-sh/nvm))
- **PostgreSQL** configurado e em execução
- **Yarn** como gerenciador de pacotes

---

##  Passo a Passo para Configuração

### 1 Criar o Banco de Dados no PostgreSQL
Crie um banco chamado `projectTeste` (ou altere o nome no `.env`).

---

###  2 Configurar variáveis de ambiente
No arquivo `.env` na raiz do projeto, adicione as credenciais do PostgreSQL:

```env
PORT=3000

DB_HOST=
DB_PORT=5432
DB_NAME=projectTeste
DB_USER=
DB_PASSWORD=



3 - Definir a versão do Node.js >= 18

```
nvm use 20

```

4 - Criar tabelas e dados fake

```
yarn migrate

```

5 - Rodar o projeto

```
yarn dev

```

Rodar os testes

```
yarn test

```



## Melhorias
- **Normalizar os paths** para manter consistência nos endpoints.  
- **Utilizar um ORM** para facilitar a manipulação do banco de dados.  
- **Separar as controllers** para melhorar a organização do código.  
- **Adicionar cache** para otimizar o desempenho.  