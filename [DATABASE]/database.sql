CREATE SCHEMA IF NOT EXISTS quiz_burgueria;
USE quiz_burgueria;

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    nickname VARCHAR(255) NOT NULL,
    uuid VARCHAR(255) NOT NULL UNIQUE,
    telefone CHAR(11) NOT NULL,
    pontos INT NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id)
);