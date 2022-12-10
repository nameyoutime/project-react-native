const app = require('./src/server');
const config = require('./src/config');

const Database = require('./src/database')

const server = require('http').createServer(app);

async function main() {
  await Database.instance.connect();
  server.listen(config.PORT, config.HOST, () => {
    console.log(`Server started on ${config.HOST}:${config.PORT}`);
  })
}
main()
