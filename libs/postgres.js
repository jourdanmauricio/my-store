const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'storeadmin',
    password: 'my_store@1974',
    database: 'my_store',
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
