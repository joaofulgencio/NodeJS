-- Criando a tabela de usuarios
CREATE TABLE usuarios (
                          id serial PRIMARY KEY,
                          nome VARCHAR(255)
);

-- Criando a tabela de cartões de serviços
CREATE TABLE cartoesdeservicos (
                                   id serial PRIMARY KEY,
                                   id_usuario integer REFERENCES usuarios(id)
);

-- Criando a tabela de serviços
CREATE TABLE servicos (
                          id serial PRIMARY KEY,
                          nome_do_servico VARCHAR(255),
                          preco numeric(10, 2)
);

-- Criando tabela de kits de serviços
CREATE TABLE kitsdeservicos (
                                id serial PRIMARY KEY,
                                nome_do_kit VARCHAR(255),
                                preco numeric(10, 2)
);

-- Criando tabela de compras de serviços
CREATE TABLE comprasdeservicos (
                                   id serial PRIMARY KEY,
                                   id_usuario integer REFERENCES usuarios(id),
                                   id_cartao_de_servicos integer REFERENCES cartoesdeservicos(id),
                                   data_da_compra DATE,
                                   valor_total numeric(10, 2)
);

-- Criando tabela de detalhes da compra
CREATE TABLE detalhesdacompra (
                                  id serial PRIMARY KEY,
                                  id_compra integer REFERENCES comprasdeservicos(id),
                                  id_servico integer REFERENCES servicos(id),
                                  id_kit integer REFERENCES kitsdeservicos(id),
                                  quantidade smallint,
                                  preco_unitario numeric(10, 2)
);

-- Adicionando campo utilizado na tabela detalhes de compra para controle
ALTER TABLE detalhesdacompra ADD COLUMN utilizado BOOLEAN DEFAULT FALSE;



-- Criando tabela de recompensas
CREATE TABLE recompensas (
                             id serial PRIMARY KEY,
                             id_usuario integer REFERENCES usuarios(id),
                             descricao VARCHAR(255),
                             ativa BOOLEAN DEFAULT TRUE
);


-- Utilização de recompensas
CREATE TABLE utilizacaoderecompensas (
                                        id serial PRIMARY KEY,
                                        id_recompensa integer REFERENCES recompensas(id),
                                        id_usuario integer REFERENCES usuarios(id),
                                        data_utilizacao DATE,
                                        utilizada BOOLEAN DEFAULT TRUE
);

CREATE OR REPLACE FUNCTION desativar_recompensa()
    RETURNS TRIGGER AS $$
BEGIN
    UPDATE recompensas
    SET ativa = FALSE
    WHERE id = NEW.id_recompensa;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER desativar_recompensa_apos_uso
    AFTER INSERT ON utilizacaoderecompensas
    FOR EACH ROW
EXECUTE FUNCTION desativar_recompensa();

-- -- Inserção de dados de exemplo em PostgreSQL
-- INSERT INTO usuarios (nome) VALUES ('João');
-- INSERT INTO usuarios (nome) VALUES ('Lucas');
-- INSERT INTO usuarios (nome) VALUES ('Guilherme');
-- INSERT INTO usuarios (nome) VALUES ('Anderson');
--
-- INSERT INTO cartoesdeservicos (id_usuario) VALUES (1);
-- INSERT INTO cartoesdeservicos (id_usuario) VALUES (2);
-- INSERT INTO cartoesdeservicos (id_usuario) VALUES (3);
-- INSERT INTO cartoesdeservicos (id_usuario) VALUES (4);
--
-- INSERT INTO servicos (nome_do_servico, preco) VALUES ('Corte de Cabelo', 50.00);
-- INSERT INTO servicos (nome_do_servico, preco) VALUES ('Corte de Barba', 40.00);
--
-- INSERT INTO kitsdeservicos (nome_do_kit, preco) VALUES ('Corte de cabelo + Corte de Barba', 70.00);
-- INSERT INTO kitsdeservicos (nome_do_kit, preco) VALUES ('Pacote de Bem-Estar', 100.00);

-- INSERT INTO comprasdeservicos (id_usuario, id_cartao_de_servicos, data_da_compra, valor_total) VALUES (1, 1, '2023-11-01', 50.00);
-- INSERT INTO comprasdeservicos (id_usuario, id_cartao_de_servicos, data_da_compra, valor_total) VALUES (2, 2, '2023-11-02', 40.00);
-- INSERT INTO comprasdeservicos (id_usuario, id_cartao_de_servicos, data_da_compra, valor_total) VALUES (3, 3, '2023-11-03', 70.00);
-- INSERT INTO comprasdeservicos (id_usuario, id_cartao_de_servicos, data_da_compra, valor_total) VALUES (4, 4, '2023-11-04', 100.00);
--
-- INSERT INTO detalhesdacompra (id_compra, id_servico, quantidade, preco_unitario) VALUES (1, 1, 1, 50.00);
-- INSERT INTO detalhesdacompra (id_compra, id_servico, quantidade, preco_unitario) VALUES (2, 2, 1, 40.00);
-- INSERT INTO detalhesdacompra (id_compra, id_kit, quantidade, preco_unitario) VALUES (3, 1, 1, 70.00);
-- INSERT INTO detalhesdacompra (id_compra, id_kit, quantidade, preco_unitario) VALUES (4, 2, 1, 100.00);


SELECT servicos.nome_do_servico, COUNT(detalhesdacompra.id_servico) AS qtd_vendas
FROM detalhesdacompra
         JOIN servicos ON detalhesdacompra.id_servico = servicos.id
GROUP BY servicos.nome_do_servico;


SELECT kitsdeservicos.nome_do_kit, COUNT(detalhesdacompra.id_kit) AS qtd_vendas
FROM detalhesdacompra
         JOIN kitsdeservicos ON detalhesdacompra.id_kit = kitsdeservicos.id
GROUP BY kitsdeservicos.nome_do_kit;


SELECT servicos.nome_do_servico, COUNT(detalhesdacompra.id_servico) AS qtd_utilizados
FROM detalhesdacompra
         JOIN servicos ON detalhesdacompra.id_servico = servicos.id
WHERE detalhesdacompra.utilizado = TRUE
GROUP BY servicos.nome_do_servico;


SELECT COUNT(*) AS qtd_recompensas
FROM recompensas;


SELECT servicos.nome_do_servico, COUNT(detalhesdacompra.id_servico) AS qtd_nao_utilizados
FROM detalhesdacompra
         JOIN servicos ON detalhesdacompra.id_servico = servicos.id
WHERE detalhesdacompra.utilizado = FALSE
GROUP BY servicos.nome_do_servico;


SELECT kitsdeservicos.nome_do_kit, COUNT(detalhesdacompra.id_kit) AS qtd_nao_utilizados
FROM detalhesdacompra
         JOIN kitsdeservicos ON detalhesdacompra.id_kit = kitsdeservicos.id
WHERE detalhesdacompra.utilizado = FALSE
GROUP BY kitsdeservicos.nome_do_kit;