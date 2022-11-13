var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrarEmpresa(nome_empresa, telefone, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.


    // Aqui seguindo nosso formulário de cadastro, ele deve inserir em 3 tabelas (empresa, usuário e endereço)
    // porém é muito confuso pois são 3 inserts de 1 vez, e não aprendemos sobre a api inteira

    // tentei fazer da seguinte forma após a linha 37 :
    // insert into empresa (cnpj, nome_empresa) values ('${cnpj}', '${nome_empresa}');
    // insert into endereco (rua, cep, numero, cidade, estado) values ('${rua}', '${cep}', '${numero}', '${cidade}', '${estado}');

    var instrucao = `
    INSERT INTO empresa (nome, cnpj, telefone) VALUES
    ('${nome_empresa}', '${cnpj}', '${telefone}');
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.


    // Aqui seguindo nosso formulário de cadastro, ele deve inserir em 3 tabelas (empresa, usuário e endereço)
    // porém é muito confuso pois são 3 inserts de 1 vez, e não aprendemos sobre a api inteira

    // tentei fazer da seguinte forma após a linha 37 :
    // insert into empresa (cnpj, nome_empresa) values ('${cnpj}', '${nome_empresa}');
    // insert into endereco (rua, cep, numero, cidade, estado) values ('${rua}', '${cep}', '${numero}', '${cidade}', '${estado}');

    var instrucao = `
        INSERT INTO usuario (nome, email, senha, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', (SELECT max(idempresa) FROM empresa));        
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarEndereco(numero, cep) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",numero, cep);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.


    // Aqui seguindo nosso formulário de cadastro, ele deve inserir em 3 tabelas (empresa, usuário e endereço)
    // porém é muito confuso pois são 3 inserts de 1 vez, e não aprendemos sobre a api inteira

    // tentei fazer da seguinte forma após a linha 37 :
    // insert into empresa (cnpj, nome_empresa) values ('${cnpj}', '${nome_empresa}');
    // insert into endereco (rua, cep, numero, cidade, estado) values ('${rua}', '${cep}', '${numero}', '${cidade}', '${estado}');

    var instrucao = `
        INSERT INTO endereco (numero, cep, fkEmpresa) VALUES ('${numero}', '${cep}', (SELECT max(idempresa) FROM empresa));        
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    cadastrarEmpresa,
    cadastrarEndereco,
    listar,
};