const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

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
})

// app.get('/talker/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, age, talk } = req.body;
//   let selectedTalker;

//   for (let i = 0; i < teams.length; i += 1) {
//     const team = teams[i];

//     if (team.id === Number(id)) {
//       team.name = name;
//       team.initials = initials;
//       updatedTeam = team;
//     }
//   }

//   res.status(200).json({ updatedTeam });
// })