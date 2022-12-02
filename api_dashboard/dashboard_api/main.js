// não altere!
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');
const sql = require('mssql');

// não altere!
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// configure a linha abaixo caso queira que os dados capturados sejam inseridos no banco de dados.
// false -> nao insere
// true -> insere
const HABILITAR_OPERACAO_INSERIR = true;

// altere o valor da variável AMBIENTE para o valor desejado:
// API conectada ao banco de dados remoto, SQL Server -> 'producao'
// API conectada ao banco de dados local, MySQL Workbench - 'desenvolvimento'
const AMBIENTE = 'producao';

const serial = async (
    valoresluminosidade1,
    valoresluminosidade2,
    valoresluminosidade3,
    valoresluminosidade4
) => {
    let poolBancoDados = ''

    if (AMBIENTE == 'desenvolvimento') {
        poolBancoDados = mysql.createPool(
            {
                // altere!
                // CREDENCIAIS DO BANCO LOCAL - MYSQL WORKBENCH
                host: 'localhost',
                user: 'aluno',
                password: 'sptech',
                database: 'luminar'
            }
        ).promise();
    } else if (AMBIENTE == 'producao') {
        console.log('Projeto rodando inserindo dados em nuvem. Configure as credenciais abaixo.');
    } else {
        throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
    }


    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        //console.log(data);
        const valores = data.split(';');
        const luminosidade1 = parseFloat(valores[0]);
        const luminosidade2 = parseFloat(valores[1]);
        const luminosidade3 = parseFloat(valores[2]);
        const luminosidade4 = parseInt(valores[4]);

        valoresluminosidade1.push(luminosidade1);
        valoresluminosidade2.push(luminosidade2);
        valoresluminosidade3.push(luminosidade3);
        valoresluminosidade4.push(luminosidade4);

        if (HABILITAR_OPERACAO_INSERIR) {
            if (AMBIENTE == 'producao') {
                // altere!
                // Este insert irá inserir os dados na tabela "medida"
                // -> altere nome da tabela e colunas se necessário
                // Este insert irá inserir dados de fk_aquario id=1 (fixo no comando do insert abaixo)
                // >> Importante! você deve ter o aquario de id 1 cadastrado.
                sqlquery = `INSERT INTO registro (luminosidade1,luminosidade2, luminosidade3,luminosidade4 , luminosidade5) VALUES (${luminosidade1}, ${luminosidade2}, ${luminosidade3}, ${luminosidade4}, CURRENT_TIMESTAMP, 1)`;

                // CREDENCIAIS DO BANCO REMOTO - SQL SERVER
                // Importante! você deve ter criado o usuário abaixo com os comandos presentes no arquivo
                // "script-criacao-usuario-sqlserver.sql", presente neste diretório.
                const connStr = "Server=svr-projeto-luminar.database.windows.net;Database=bd-projeto-luminar;User Id=admin-projeto-luminar;Password=#Gfgrupo08;";

                function inserirComando(conn, sqlquery) {
                    conn.query(sqlquery);
                    console.log("valores inseridos no banco: ", luminosidade1 + ", " + luminosidade2 + ", " + luminosidade3 + ", " + luminosidade4)
                }

                sql.connect(connStr)
                    .then(conn => inserirComando(conn, sqlquery))
                    .catch(err => console.log("erro! " + err));

            } else if (AMBIENTE == 'desenvolvimento') {

                // altere!
                // Este insert irá inserir os dados na tabela "medida"
                // -> altere nome da tabela e colunas se necessário
                // Este insert irá inserir dados de fk_aquario id=1 (fixo no comando do insert abaixo)
                // >> você deve ter o aquario de id 1 cadastrado.
                await poolBancoDados.execute(
                    'INSERT INTO registro (luminosidade1,luminosidade2, luminosidade3,luminosidade4 , data_hora,fksensor) VALUES (?, ?, ?, ?,now(),1)',
                    [luminosidade1, luminosidade2,luminosidade3, luminosidade4]
                );
                console.log("valores inseridos no banco: ", luminosidade1 + ", " + luminosidade2 +  ", " + luminosidade3 + ", " + luminosidade4)

            } else {
                throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
            }
        }
    });
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}


// não altere!
const servidor = (
    valoresluminosidade1,
    valoresluminosidade2,
    valoresluminosidade3,
    valoresluminosidade4
) => {
    const app = express();
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });
    app.get('/sensores/dht11/umidade', (_, response) => {
        return response.json(valoresluminosidade1);
    });
    app.get('/sensores/dht11/temperatura', (_, response) => {
        return response.json(valoresluminosidade2);
    });
    app.get('/sensores/luminosidade', (_, response) => {
        return response.json(valoresLuminosidade5);
    });
    app.get('/sensores/lm35/temperatura', (_, response) => {
        return response.json(valoresluminosidade3);
    });
    app.get('/sensores/luminosidade4', (_, response) => {
        return response.json(valoresluminosidade4);
    });
}

(async () => {
    const valoresluminosidade1 = [];
    const valoresluminosidade2 = [];
    const valoresluminosidade3 = [];
    const valoresluminosidade4 = [];
    await serial(
        valoresluminosidade1,
        valoresluminosidade2,

        valoresluminosidade3,
        valoresluminosidade4
    );
    servidor(
        valoresluminosidade1,
        valoresluminosidade2,

        valoresluminosidade3,
        valoresluminosidade4
    );
})();
