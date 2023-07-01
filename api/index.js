const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const loadBackend = require('./src/middleware/loadBackend.js');

conn.sync({ alter: true }).then(async () => {
  //conn.sync({ force: true }).then(async () => {
  //bdd se reinicia con el server

  await loadBackend();

  server.listen(3001, () => {
    console.log('Server listening at 3001');
  });
});
