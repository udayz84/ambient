const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://postgres:root@178.236.185.20:5432/postgres',
  connectionTimeoutMillis: 5000
});

async function checkDb() {
  try {
    await client.connect();
    const tablesRes = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log('Tables on 5432:', tablesRes.rows.map(r => r.table_name).join(', '));
  } catch (err) {
    console.error('DB Error on 5432:', err.message);
  } finally {
    await client.end();
  }
}

checkDb();
