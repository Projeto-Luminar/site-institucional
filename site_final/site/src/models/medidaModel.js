var database = require("../database/config");
const idSensor = 1
function buscarUltimasMedidas( limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select 
        luminosidade1,luminosidade2,luminosidade3,luminosidade4,
                        data_hora,
                        DATE_FORMAT(data_hora,'%H:%i:%s') as momento_grafico
                    from  registro where fkSensor =${idSensor}
                    order by idregistro desc limit 7;`;

                    // select luminosidade1, luminosidade2, luminosidade3, luminosidade4, FORMAT(data_hora, 'hh:mm:ss') as data_hora FROM registro;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        luminosidade1,luminosidade2,luminosidade3,luminosidade4,
                        data_hora,
                        DATE_FORMAT(data_hora,'%H:%i:%s') as momento_grafico
                    from  registro where fkSensor =${idSensor}
                    order by idregistro desc limit 7;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fkSensor = ${idSensor} 
                    order by id desc`;

                    // select top 1
                    // luminosidade1,luminosidade2,luminosidade3,luminosidade4,
                    //          FORMAT(data_hora,'%H:%i:%s') as momento_grafico
                    //          from  registro where fkSensor = ${idSensor}
                    //          order by idregistro desc;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        luminosidade1,luminosidade2,luminosidade3,luminosidade4,
                        data_hora,
                        DATE_FORMAT(data_hora,'%H:%i:%s') as momento_grafico
                    from  registro where fkSensor =${idSensor}
                    order by idregistro desc limit 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
