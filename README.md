<h1 align="center">
  <img src="./.github/nave-logo.png" width="200" />
</h1>

<p align="center">
  <img alt="Node.js Logo" src="https://img.shields.io/badge/Node.js-LTS-6404CB?logo=node.js&labelColor=fff">&nbsp;&nbsp;
  <img alt="Express Logo" src="https://img.shields.io/badge/Express-v4.17.1-6404CB?logo=express&labelColor=fff&logoColor=000">&nbsp;&nbsp;
  <img alt="TypeORM Logo" src="https://img.shields.io/badge/TypeORM-v0.2.54-6404CB?logo=typeorm&labelColor=fff&logoColor=000">&nbsp;&nbsp;
  <img alt="TypeORM Logo" src="https://img.shields.io/badge/Docker-v20.10.5-6404CB?logo=docker&labelColor=fff">&nbsp;&nbsp;
</p>

<h1 align="center">Navedex API</h1>
<p align="center">Desafio proposto pela empresa Nave.rs para a vaga de Backend Júnior</p>

<p align="center">
  <a href="https://insomnia.rest/run/?label=Navedex%20API&uri=https%3A%2F%2Fgithub.com%2FlemuelZara%2Fnavedex%2Fblob%2Fmain%2F.github%2Finsomnia.json">
  <img src="https://insomnia.rest/images/run.svg" />
</p>

<br>

<p align="center">
  <a href="#books-sobre-o-projeto">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#bank-estruturação-do-banco-de-dados">Banco de Dados</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#construction_worker-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#runner-como-executar-o-projeto">Como executar o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#crossed_swords-dificuldades">Dificuldades</a>&nbsp;&nbsp;&nbsp;
</p>

## :books: Sobre o projeto

Implementação de uma API utilizando Node.js no padrão RESTful que possibilite as funcionalidades de um CRUD para Navers e Projetos.

<br>

## :bank: Estruturação do Banco de Dados

Abaixo segue a imagem de como fiz a estruturação do banco de dados referente a aplicação:

<img src="./.github/nave-challenge-database.png">

<br>

## :construction_worker: Instalação

> 💡 Antes de baixar o projeto, é necessário ter instalado o Node.js e o Yarn (ou NPM) primeiro

**Clone o repositório via HTTPS, com esse comando:**

```shell
git clone https://github.com/lemuelZara/navedex.git
```

**Entre dentro do projeto e baixe as dependências do projeto:**
```shell
# Entrando dentro do repositório
cd navedex

# Se usar Yarn
yarn

# Se usar NPM
npm install
```

Crie suas de variáveis de ambiente baseado no arquivo .env.example:
```shell
cp .env.example .env
```

<br>

## :runner: Como executar o projeto

> 💡 **Atenção!** O Docker está sendo utilizado para prover um container do PostgreSQL para servir como banco de dados.

Para preparar o banco de dados e executar a aplicação, defina suas variáveis de ambiente e execute docker-compose:
```shell
sudo docker-compose up -d
```

Execute o comando para criar as `migrations` e configurar o esquema do banco de dados:
```shell
yarn typeorm migration:run
```

Execute o seguinte comando para iniciar o aplicativo em um ambiente de desenvolvimento:
```shell
yarn dev
```

<br>

## :crossed_swords: Dificuldades

  - Entender inicialmente como ficaria a estruturação das tabelas do banco. Depois de um tempo pensando um pouco e raciocinando melhor, ficou mais claro como devia ficar.

  - Criar a relação entre Naver's e Project's, bem como como realizar o cadastro de um Naver com nenhum ou + Projects, e vice-versa. Pesquisando a respeito, a melhor escolha para mim seria utilizar a anotação `@ManyToMany` do TypeORM, onde o trabalho de cadastro dessas entidades ficou mais fácil.

  - Criar a lógica por trás da filtragem (por `name`, `birthdate` e `admission_date`) de Naver's. No final, para resolver isso, criei métodos para buscar os Naver's cada qual com sua propriedade específica:
    - `findAllByName`
    - `findAllByAdmissionDate`
    - `findAllByJobRole`

    Dessa forma, a manipulação e verificação desses dados se tornou mais fácil.
