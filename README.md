# Projeto CRUD com Autenticação JWT

Este projeto consiste em uma aplicação de lado a lado do servidor e do cliente que permitem a criação, leitura, atualização e exclusão de dados em um banco de dados MongoDB.

## Links para atalhos

[Rotas de Autenticação](#rotas-de-autenticação)

[Página de Registro](#página-de-registro)

[Banco de Dados MongoDB](#banco-de-dados-mongodb)

[Arquitetura MVC](#arquitetura-mvc)

[Permissão de Acesso](#permissão-de-acesso)

[Como usar o projeto](#como-usar-o-projeto)



## Rotas de Autenticação

O projeto inclui rotas de autenticação, incluindo o login. A lógica de autenticação funciona da seguinte maneira:

1. O usuário fornece seu endereço de e-mail e senha na rota de login.
2. A aplicação faz uma solicitação à API do banco de dados para verificar se o e-mail e a senha fornecidos correspondem a algum registro no banco de dados.
3. Se houver uma correspondência, a aplicação cria um token JWT para o usuário.

A rota para a autenticação do token é `localhost:4000/token/auth` e é acessada usando o método `GET`. No entanto, é necessário incluir o cabeçalho `Authorization` com o valor "token" na solicitação.

<br>

### <em>Rotas</em>

| Método | Rota | Descrição |
| ------ | ----- | ----------- |
|  **`GET`** | **/users** | Retorna todos os usuários. |
|  **`GET`** | **/users/:id** | Retorna um só usuário. |
|  **`POST`** | **/users** | Cria um novo usuário.  |
|  **`PATCH`** | **/users/:id** | Atualiza o usuário específico.
|  **`DELETE`** | **/users/:id** | Deleta o usuário.
|  **`POST`** | **/token/auth** | Pega o token gerado do usuário (Com o email e senha de login).
|  **`POST`** | **/login** | Conecta a API REST e utiliza métodos para verificar os dados (Com headers de authorization)


## Página de Registro
Uma página de registro simples está disponível para permitir que os usuários criem uma nova conta antes de fazer login na aplicação. Para criar uma nova conta, basta fornecer seu endereço de e-mail e senha e enviar a requisição.

## Arquitetura MVC
Este projeto está estruturado usando o padrão de arquitetura Model-View-Controller (MVC). Isso significa que a lógica de negócios, a exibição de dados e a interação do usuário estão separadas em componentes distintos para facilitar a manutenção e o desenvolvimento da aplicação.


## Banco de Dados MongoDB

Este projeto utiliza o banco de dados MongoDB para armazenar informações sobre usuários, incluindo suas informações de login. A aplicação pode criar novos usuários e ler informações de usuários existentes para autenticar o login do usuário.

## Permissão de Acesso

O token JWT permite que o usuário tenha acesso à sua conta após a autenticação bem-sucedida. Sem o token válido, a aplicação negará o acesso.

## Como usar o projeto

1. Clone o projeto para sua máquina local.
2. Instale as dependências necessárias executando o comando `npm install` no terminal na pasta raiz do projeto.
3. Inicie o servidor executando o comando `node index.js` ou `nodemon index` no terminal na pasta raiz do projeto.
4. Abra a aplicação cliente em seu navegador acessando `localhost:4000`.
5. Siga as instruções na aplicação para criar um novo usuário ou fazer login com um usuário existente.
