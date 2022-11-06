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



function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var telefone = req.body.telefoneServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var nome_empresa = req.body.nome_empresaServer;
    var cnpj = req.body.cnpjServer;
    var rua = req.body.ruaServer;
    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;
    var cidade = req.body.cidadeServer;
    var estado = req.body.estadoServer;


    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Seu sobrenome está indefinido!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está indefinido!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está indefinido!");
    } else if (email == undefined) {    
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {    
        res.status(400).send("Sua senha está indefinida!");
    } else if (nome_empresa == undefined) {
        res.status(400).send("Seu nome da empresa está indefinido!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está indefinido!");
    } else if (rua == undefined) {
        res.status(400).send("Sua rua está indefinida!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está indefinido!");
    } else if (numero == undefined) {
        res.status(400).send("Seu número está indefinido!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está indefinida!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está indefinido!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, sobrenome, telefone, cpf, email, senha, nome_empresa, cnpj, rua, cep, numero, cidade, estado)
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
    listar,
    testar
}