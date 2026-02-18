Raissa Antonia Bernardo de Oliveira
Rafael Ceschi Rufino

*Visão Geral do Projeto*
O projeto consiste em um Gerenciador de Produtos, dividido em:
Back-End: Java, Spark e MySQL
Front-End: HTML, CSS e JavaScript, usando React Vite
Comunicação via REST API
CRUD completo: Criar, listar, editar e excluir produtos

O objetivo é entregar um sistema funcional, que seja fácil de executar, atendendo os pontos importantes impostos na atividade.



*Como Executar o Back-End:*
Necessários:
Java JDK 21 ou superior
MySQL
MySQL Workbench (opcional)
VS Code com extensão Java

As bibliotecas usadas no projeto:
spark-core
gson
mysql-connector
jetty (server, io, utils, servlet)
Obs: No projeto já existe a pasta /lib com todas as dependências usadas.


*Como Executar o Front-End:*
Abrir o cmd em: Faculdade_SENAI\app_frontProdutos\FrontEnd
Instalar o node-modules: "npm install"
Rodar a aplicação: "npm run dev"


-> PASSO A PASSO:
1- Clonar o repositório
2- Abrir a pasta: Faculdade_SENAI\app_frontProdutos
3- Importar na IDE de Back-End
4- Configurar o banco de dados MySQL:

CREATE DATABASE aulajdbc;
USE aulajdbc;

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);

5- Ajustar as credenciais do banco de dados
final String USER = "seu_root";
final String PASSWORD = "sua_senha";

6- Rodar o back e o front-end


*Endpoints Disponíveis:*

PRODUTOS
GET	/produtos	Lista todos os produtos
GET	/produtos/:id	Busca um produto
POST	/produtos	Cria um produto
PUT	/produtos/:id	Atualiza um produto
DELETE	/produtos/:id	Apaga um produto

CATEGORIAS
Método	Rota	Descrição
GET	/categorias	Lista categorias
GET	/categorias/:id	Busca categoria
POST	/categorias	Cria categoria
PUT	/categorias/:id	Atualiza categoria
DELETE	/categorias/:id	Apaga categoria


*Testar a aplicação*
Testar input:
Preencha o formulário → clique em Adicionar.

Testar edição:
Clique em Editar ao lado do produto → edite → salvar.

Testar exclusão:
Clique em Excluir.

Testar categorias
Mesmos comandos de produto, porém no lugar sinalizado como categoria.


*Estrutura*

Projeto
 ┣ Back-End
 │  ┣ api
 │  ┣ dao
 │  ┣ model
 │  ┣ util
 │  ┗ App.java
 ┣ Front-End
 │  ┣ api
 │  ┣ assets
 │  ┣ componentes
 │  ┣ App.css
 │  ┣ App.jsx
 │  ┣ Index.jsx
 │  ┣ main.jsx
 ┗ README.txt

*Tecnologias Utilizadas*
Back-End:
Java 21
Spark Java
MySQL
JDBC
GSON

Front-End:
HTML5
CSS3
JavaScript (fetch API)
React

O projeto foi desenvolvido seguindo boas práticas.


