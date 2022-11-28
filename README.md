# Talker Manager - Back-End Project

Projeto de uma API RESTful com Node.js de um sistema de cadastro de talkers (palestrantes) em que será possível cadastrar, visualizar, pesquisar, editar e excluir informações.
Os endpoints desenvolvidos lêem e escrevem em um arquivo utilizando o módulo `fs`.

Projeto 22 da [Trybe](https://wwww.betrybe.com), módulo de Back-End.

## O Projeto

#### 1. Criação de Rotas de Produtos:
   - Listar palestrantes (talkers): endpoints GET `/talker` e `/talker/:id`.
   - Cadastrar usuário (login): endpoint POST `/login`, com validações.
   - Cadastrar palestrante: endpoint POST `/talker`, com validações de token de login e de informações da requisição.
   - Atualizar/update de palestrante: endpoint PUT `/talker/:id`, verificando se o id do produto é encontrado.
   - Deletar um palestrante: endpoint DELETE `/talker/:id`, verificando se o id do produto é encontrado.

## Instalação 

#### 1- Clonar o repositório

```git clone git@github.com:sallybdiament/Project-21-Talker-Manager.git```

#### 2 - Instalar as dependências (é necessário ter o Node instalado no seu computador)

```npm install```

#### 6 - Iniciar a aplicação Node com Nodemon:

```npm run dev```

#### Caso não tenha Node instalado, é possível iniciar com o Docker:
Na raíz do projeto: ```docker-compose up -d```
Abrir o terminal do container: ```docker exec -it store_manager bash```
Rodar o comando: ```npm install```


## Habilidades:
- Entender a diferença entre execução síncrona e assíncrona;
- Realizar operações assíncronas com callbacks e Promises;
- Ler e escrever arquivos localmente com NodeJS;
- Escrever os próprios scripts que criam e consomem Promises;
- Realizar chamadas de funções de forma consciente;
- Entender o que é o HTTP, o que é uma API e o que os dois têm a ver com o Express;
- Entender a estrutura de uma aplicação Express e como organizar seu código;
- Criar rotas e aplicar middlewares;
- Escrever APIs utilizando Node e Express.

## Tecnologias
- Node.js
- JavaScript
- Express.js
- Docker
