const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://postgres:root@200.141.0.151:7000/postgres'
});

async function testConnection() {
  try {
    await client.connect();
    console.log("Successfully connected to the database!");
    
    const res = await client.query('SELECT NOW()');
    console.log("Database time:", res.rows[0]);
    
    await client.end();
  } catch (err) {
    console.error("Connection error:", err.message);
  }
}

testConnection();
