create table Entidade (
        id int8 not null,
        cnpj varchar(255),
        cpf varchar(255),
        agencia varchar(255),
        contaCorrente varchar(255),
        nomeBanco varchar(255),
        email varchar(255),
        cep varchar(255),
        logradouro varchar(255),
        numero varchar(255),
        nome varchar(255),
        tipo int4,
        primary key (id)
);

create sequence sq_entidade;
    
   