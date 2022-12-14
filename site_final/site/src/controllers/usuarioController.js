var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


function cadastrarEmpresa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome_empresa = req.body.nome_empresaServer;
    var telefone = req.body.telefoneServer;
    var cnpj = req.body.cnpjServer;


    // Faça as validações dos valores
    if (telefone == undefined) {
        res.status(400).send("Seu telefone está indefinido!");
    } else if (nome_empresa == undefined) {
        res.status(400).send("Seu nome da empresa está indefinido!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está indefinido!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEmpresa(nome_empresa, telefone, cnpj)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}



function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeUser = req.body.nomeUserServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nomeUser == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {    
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {    
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nomeUser, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarEndereco(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var numero = req.body.numeroServer;
    var cep = req.body.cepServer;

    // Faça as validações dos valores
    if (numero == undefined) {
        res.status(400).send("Seu numero está undefined!");
    } else if (cep == undefined) {    
        res.status(400).send("Seu cep está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEndereco(numero, cep)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarNovoFunc(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeUser = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipo = req.body.tipoServer;
    var fkempresa = req.body.fkempresaServer;

    // Faça as validações dos valores
    if (nomeUser == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {    
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {    
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarNovoFunc(nomeUser, email, senha, tipo, fkempresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    cadastrar,
    cadastrarEmpresa,
    cadastrarEndereco,
    listar,
    testar,
    cadastrarNovoFunc
}