const { Client } = require('pg');

const dbConfig = {
  user: 'postgres',
  password: '070901',
  host: '127.0.0.1',
  database: 'postgres',
  port: 5432,
};


async function connect(banco) {
  try {
    await banco.connect();
    console.log('Conexão com o banco de dados estabelecida.');
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
  }
}

async function disconnect(banco) {
  try {
    await banco.end();
    console.log('Conexão com o banco de dados encerrada.');
  } catch (error) {
    console.error('Erro ao encerrar conexão com o banco de dados:', error);
  }
}

async function runQuery(query,banco) {
  try {
    const result = await banco.query(query);
    return result;
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    throw error;
  }
}

async function consulta(query) {
  try {
    const banco = new Client(dbConfig);
    await connect(banco);
    const dados = await runQuery(query,banco);
    await disconnect(banco)
    return dados;
  } catch (error) {
    throw error;
  }
}


module.exports = consulta;