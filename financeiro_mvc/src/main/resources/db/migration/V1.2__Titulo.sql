create table Titulo (
    id int8 not null,
    dataEmissao date,
    dataVencimento date,
    descricao varchar(255),
    conteudo bytea,
    nome varchar(255),
    numero int8,
    total int8,
    recorrente boolean,
    situacao int4,
    tipo int4,
    valor numeric(19, 2),
    fornecedor_id int8,
    grupoDespesa_id int8,
    primary key (id)
);

create index UK_j56ax2sk3g6iq9f52lmncktmb on Titulo (fornecedor_id);
create index UK_kvohwcsf8ek6860r3fmgd7ny0 on Titulo (dataVencimento); 
create index UK_3jnc3jrxf4vi7nmk69nnw9m6o on Titulo (tipo);

alter table Titulo 
    add constraint FK_j56ax2sk3g6iq9f52lmncktmb 
    foreign key (fornecedor_id) 
    references Entidade;
    
alter table Titulo 
    add constraint FK_slxsuab2i2ymyumja9hphptit 
    foreign key (grupoDespesa_id) 
    references GrupoDespesa;

create sequence sq_titulo;