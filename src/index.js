const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const generateToken = require('./generateToken');
const { emailValidation, passwordValidation, emailValidationFormat } = require('./auth');

const pathTalker = path.resolve(__dirname, 'talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const talkers = JSON.parse(await fs.readFile(pathTalker, 'utf8'));
  res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile(pathTalker, 'utf8'));
  const checkedId = talkers.filter((talker) => talker.id === +id);
  console.log(checkedId);
  if (checkedId.length === 0) {
return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
 return res.status(200).json(talkers[id - 1]);
});

app.post('/login', emailValidation, passwordValidation, emailValidationFormat, async (req, res) => {
// const { email, password } = req.body;
// if ([email, password].includes(undefined)) {
//   return res.status(401).json({ message: 'Campos ausentes!' });
// }
const token = generateToken();
return res.status(200).json({ token });
});
