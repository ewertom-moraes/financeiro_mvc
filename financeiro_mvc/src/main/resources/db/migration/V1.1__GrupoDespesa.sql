create table GrupoDespesa (
        id int8 not null,
        codigo varchar(255),
        descricao varchar(255),
        primary key (id)
);

create sequence sq_grupo_despesa;