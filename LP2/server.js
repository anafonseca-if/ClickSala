import express from 'express';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';

import { solicitacoes } from './front-end/js/dados.js';

const app = express();
app.use(morgan('tiny'));

app.use(express.json());

app.post('/solicitacoes', (req, res) => {
  const { sala, data, hora, finalidade } = req.body;

  if (!sala || !data || !hora) {
    return res.status(400).json({ error: 'Os campos sala, data e hora são obrigatórios.' });
  }

  const novaSolicitacao = {
    id: uuidv4(),
    sala,
    data,
    hora,
    finalidade: finalidade || '',
    status: 'Pendente',
  };

  solicitacoes.push(novaSolicitacao);
  return res.status(201).json(novaSolicitacao);
});

app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});