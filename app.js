const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 5001; 

const consulta = require('./conection'); 

app.use(express.json());
app.use(cors())

// GET
app.get('/usuario/obter-dados', async (req, res) => {
  try {
    const query = `SELECT * from mydb.usuario`;

    const result = await consulta(query);

    res.json(result.rows);
  } catch (error) {
    console.error('Erro na rota /api/obter-dados:', error);
    res.status(500).json({ error: 'Erro ao buscar dados.' });
  }
});

app.get('/midia/obter-dados', async (req, res) => {
  try {
    const query = `SELECT * from mydb.midia`;

    const result = await consulta(query);

    res.json(result.rows);
  } catch (error) {
    console.error('Erro na rota /musica/obter-dados:', error);
    res.status(500).json({ error: 'Erro ao buscar dados.' });
  }
});

app.get('/user-music/obter-dados', async (req, res) => {
  try {
    const query = `SELECT * from mydb.usuario_has_midia`;

    const result = await consulta(query);

    res.json(result.rows);
  } catch (error) {
    console.error('Erro na rota /musica/obter-dados:', error);
    res.status(500).json({ error: 'Erro ao buscar dados.' });
  }
});


//Post

app.post('/usuario/enviar-dados', async (req, res) => {
  try {
    const { cpf, primeiro_nome, segundo_nome, plano_nome} = req.body;
    const seguidores = 0 

    const query = `INSERT INTO mydb.usuario (cpf, primeiro_nome, segundo_nome, plano_nome, seguidores) VALUES ('${cpf}', '${primeiro_nome}', '${segundo_nome}', '${plano_nome}', '${seguidores}')`;
    const result = await consulta(query);

    res.json({ message: 'Dados inseridos com sucesso.' });
  } catch (error) {
    console.error('Erro na rota /api/enviar-dados:', error);
    res.status(500).json({ error: 'Erro ao enviar dados.' });
  }
});

app.post('/midia/enviar-dados', async (req, res) => {
  try {
    const { id, nome, duracao, tipo, genero_midia, data_publicacao} = req.body;
    const likes = 0;

    const query = `INSERT INTO mydb.midia (id, nome, duracao, tipo, genero_midia, data_publicacao, likes) VALUES ('${id}', '${nome}', '${duracao}', '${tipo}', '${genero_midia}','${data_publicacao}', '${likes}')`;
    const result = await consulta(query);

    res.json({ message: 'Dados inseridos com sucesso.' });
  } catch (error) {
    console.error('Erro na rota /api/enviar-dados:', error);
    res.status(500).json({ error: 'Erro ao enviar dados.' });
  }
});

app.post('/user-music/enviar-dados', async (req, res) => {
  try {
    const { user, midia} = req.body;

    const query = 
    `INSERT INTO mydb.usuario_has_midia (usuario_cpf, midia_id) VALUES ('${user}', '${midia}')`;
    const result = await consulta(query);

    res.json({ message: 'Dados inseridos com sucesso.' });
  } catch (error) {
    console.error('Erro na rota /api/enviar-dados:', error);
    res.status(500).json({ error: 'Erro ao enviar dados.' });
  }
});


//Update


app.put('/usuario/atualizar-dados/:id', async (req, res) => {
  try {
    const { id } = req.params; 

    const query = `UPDATE mydb.usuario SET seguidores = seguidores + 1 WHERE cpf = '${id}'`;
    const result = await consulta(query);

    res.json({ message: 'Dados atualizados com sucesso.' });
  } catch (error) {
    console.error('Erro na rota /api/atualizar-dados:', error);
    res.status(500).json({ error: 'Erro ao atualizar dados.' });
  }
});

app.put('/midia/atualizar-dados/:id', async (req, res) => {
  try {
    const { id } = req.params; 

    const query = `UPDATE mydb.midia SET likes = likes + 1 WHERE id = '${id}'`;
    const result = await consulta(query);

    res.json({ message: 'Dados atualizados com sucesso.' });
  } catch (error) {
    console.error('Erro na rota /api/atualizar-dados:', error);
    res.status(500).json({ error: 'Erro ao atualizar dados.' });
  }
});

app.put('/user-music/atualizar-dados/:midia', async (req, res) => {
  try {
    const { midia } = req.params; 
    const {user, nova_midia} = req.body;

    const query = `
    DELETE FROM mydb.usuario_has_midia WHERE midia_id = '${midia}';

    update mydb.midia
    set id = '${nova_midia}'
    where id = '${midia}';

    INSERT INTO mydb.usuario_has_midia (usuario_cpf, midia_id) 
    VALUES ('${user}', '${nova_midia}');`;
    const result = await consulta(query);

    res.json({ message: 'Dados atualizados com sucesso.' });
  } catch (error) {
    console.error('Erro na rota /api/atualizar-dados:', error);
    res.status(500).json({ error: 'Erro ao atualizar dados.' });
  }
});

//DELETE

app.delete('/usuario/excluir-dados/:cpf', async (req, res) => {
  try {
    const { cpf } = req.params; 

    const query = `DELETE FROM mydb.usuario WHERE cpf = '${cpf}'`;
    const result = await consulta(query);

    res.json({ message: 'Dados excluídos com sucesso.' });
  } catch (error) {
    console.error('Erro na rota /api/excluir-dados:', error);
    res.status(500).json({ error: 'Erro ao excluir dados.' });
  }
});

app.delete('/midia/excluir-dados/:id', async (req, res) => {
  try {
    const { id } = req.params; 

    const query = `DELETE FROM mydb.midia WHERE id = '${id}'`;
    const result = await consulta(query);

    res.json({ message: 'Dados excluídos com sucesso.' });
  } catch (error) {
    console.error('Erro na rota /api/excluir-dados:', error);
    res.status(500).json({ error: 'Erro ao excluir dados.' });
  }
});

app.delete('/user-music/excluir-dados/:id', async (req, res) => {
  try {
    const { id } = req.params; 
    const { midia_id} = req.body;

    const query = `DELETE FROM mydb.usuario_has_midia WHERE usuario_cpf = '${id}' AND midia_id = '${midia_id}'`;
    const result = await consulta(query);
    res.json({ message: 'Dados excluídos com sucesso.' });

  } catch (error) {
    console.error('Erro na rota /api/excluir-dados:', error);
    res.status(500).json({ error: 'Erro ao excluir dados.' });
  }
});



app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});