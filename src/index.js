const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const generateToken = require('./generateToken');
const { emailValidation, passwordValidation, emailValidationFormat } = require('./auth');
const { validateToken, 
  validateName, 
  validateAge, 
  validateTalk, 
  validateWatchedAt, 
  validateRate } = require('./validations');

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

app.post('/login', emailValidation,
passwordValidation,
emailValidationFormat, async (req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

app.post('/talker', validateToken, 
validateName, validateAge, validateTalk, 
validateWatchedAt, validateRate, async (req, res) => {
  const talker = { ...req.body };
  const talkers = JSON.parse(await fs.readFile(pathTalker, 'utf8'));
  talker.id = talkers.length + 1;
  talkers.push(talker);
  await fs.writeFile(pathTalker, JSON.stringify(talkers));
  res.status(201).json(talker);
});

app.put('/talker/:id', 
validateToken, validateName, 
validateAge, validateTalk, validateWatchedAt, 
validateRate, async (req, res) => {
  const { id } = req.params;
  const talker = { ...req.body };
  const talkers = JSON.parse(await fs.readFile(pathTalker, 'utf8'));
  const index = talkers.findIndex((item) => item.id === parseInt(id));
  talker.id = +(id);
  talkers[index] = talker;
  await fs.writeFile(pathTalker, JSON.stringify(talkers));
  res.status(200).json(talker);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile(pathTalker, 'utf8'));
  const arrayPosition = talkers.findIndex((talker) => talker.id === Number(id));
  talkers.splice(arrayPosition, 1);
  await fs.writeFile(pathTalker, JSON.stringify(talkers));
  res.status(204).end();
});
