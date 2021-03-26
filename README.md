# Navedex API | Nave.rs

## Requisitos

- [x] Deve ser possível cadastrar um usuário
- [x] Deve ser possível realizar o login com um usuário

## Etapas

- [x] Criar a classe de Naver e fazer o relacionamento 1:N com o User (feito)
- [x] Cadastrar um Naver sem o campo projects (feito)
- [x] Criar a classe de Product (não feito)
- [] Cadastrar um Product (não feito)
- [] Criar a classe de NaverProduct e fazer o relacionamento N:M com a classe de Naver e com a classe de Product (não feito)
- [] Por fim, cadastrar novamente um Naver com o campo "projects: []"

## Estruturação das tabelas do banco de dados

Aqui fica a imagem do DER

<br>

## Como utilizar o projeto

Rodar as `migrations` do banco de dados:

`yarn typeorm migration:run`

<br>

## Ferramentas e Tecnologias utilizadas

 - Express
 - Docker, Docker Compose
 - TypeORM

<br>

## Comandos úteis

Ver os dados do banco de dados:

```shell
## Entra dentro do container do postgres
sudo docker exec -it nave /bin/bash

## Depois de entrar no container, use o PSQL para realizar a conexão com o banco de dados
psql nave postgres

## Feito isso, só usar os comandos do PSQL para ver as mudanças feitas
\d
\dt
select * from users;
select * from navers;
select * from projects;
...
```
