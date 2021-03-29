<h1 align="center">
  <img src="./.github/nave-logo.png" />
</h1>

<p align="center">
  <img alt="Node.js Logo" src="https://img.shields.io/badge/Node.js-LTS-6600ca?logo=node.js&labelColor=fff">&nbsp;&nbsp;
  <img alt="Express Logo" src="https://img.shields.io/badge/Express-4.17.1-6600ca?logo=express&labelColor=fff&logoColor=000">&nbsp;&nbsp;
  <img alt="TypeORM Logo" src="https://img.shields.io/badge/TypeORM-0.2.54-6600ca?logo=typeorm&labelColor=fff&logoColor=000">&nbsp;&nbsp;
</p>

<h1 align="center">Navedex API</h1>
<p align="center">Desafio proposto pela empresa Nave.rs para a vaga de Backend Júnior</p>

<br>

## Estruturação do Banco de Dados

Abaixo segue a imagem de como fiz a estruturação do banco de dados referente a aplicação:

<img src="./.github/nave-challenge-database.png">

<br>

## Dificuldades
  - Entender inicialmente como ficaria a estruturação das tabelas do banco. Depois de um tempo pensando um pouco e raciocinando melhor, ficou mais claro como devia ficar.

  - Criar a relação entre Naver's e Project's, bem como como realizar o cadastro de um Naver com nenhum ou + Projects, e vice-versa. Pesquisando a respeito, a melhor escolha para mim seria utilizar a anotação `@ManyToMany` do TypeORM, onde o trabalho de cadastro dessas entidades ficou mais fácil.

  - Criar a lógica por trás da filtragem (por `name`, `birthdate` e `admission_date`) de Naver's. No final, para resolver isso, criei métodos para buscar os Naver's cada qual com sua propriedade específica:
    - `findAllByName`
    - `findAllByAdmissionDate`
    - `findAllByJobRole`

    Dessa forma, a manipulação e verificação desses dados se tornou mais fácil.
