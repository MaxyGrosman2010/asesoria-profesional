require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const loadBackend = require('./src/middleware/loadBackend.js');
const PORT = process.env.PORT || 3001;
//conn.sync({ force: false }).then(async () => {
conn.sync({ alter: true }).then(async () => {
  //conn.sync({ force: true }).then(async () => {
  //bdd se reinicia con el server↑↑↑

  await loadBackend();

  server.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
  });
});
