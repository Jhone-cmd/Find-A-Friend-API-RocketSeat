# Find a Friend API

Nesse desafio desenvolveremos uma API para a adoção de animais, a FindAFriend API, utilizando SOLID e testes.

## Regras da aplicação

### RF (Requisitos Funcionais)
 
 - [X] Deve ser possível cadastrar um pet;
 - [X] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
 - [X] Deve ser possível filtrar pets por suas características;
 - [X] Deve ser possível visualizar detalhes de um pet para adoção;
 - [X] Deve ser possível se cadastra como uma ORG;
 - [X] Deve ser possível realizar login como uma ORG;
 
### RN (Regras de Negócio)

 - [X] Para listar os pets, obrigatoriamente precisamos informar a cidade;
 - [X] Uma ORG precisa ter um endereço e um número de WhatsApp;
 - [X] Um pet deve estar ligado a uma ORG;
 - [] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
 - [X] Todos os filtros, além da cidade, são opcionais;
 - [X] Para uma ORG acessar a aplicação como admin, ela precisa estar logada;


### RNF (Requisitos Não Funcionais)

 - [X] A senha do ORG precisa estar criptografada; 
 - [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
 - [X] Todas as listas de dados precisam estar paginadas com 20 itens por página;
 - [X] A ORG deve ser autenticado por um JWT (Json Web Token);