const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const loadBackend = require('./src/middleware/loadBackend.js');

conn.sync({force: false}).then( async() => {

  await loadBackend();

  server.listen(3001, () => {
    console.log('Server listening at 3001');
  });
});