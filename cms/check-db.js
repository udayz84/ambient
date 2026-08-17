const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://postgres:root@178.236.185.20:6000/postgres'
});

async function checkDb() {
  try {
    await client.connect();
    console.log('Connected to DB successfully!');
    
    const tablesRes = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    const tables = tablesRes.rows.map(r => r.table_name);
    console.log(`Found ${tables.length} tables in public schema.`);
    
    if (tables.length === 0) {
      console.log('DATABASE IS EMPTY!');
      return;
    }
    
    if (tables.includes('articles')) {
      const articlesRes = await client.query('SELECT count(*) FROM articles');
      console.log(`Articles table exists and has ${articlesRes.rows[0].count} rows.`);
      
      const adminUsersRes = await client.query('SELECT count(*) FROM admin_users');
      console.log(`Admin users table has ${adminUsersRes.rows[0].count} rows.`);
    } else {
      console.log('Articles table NOT found!');
    }
  } catch (err) {
    console.error('DB Error:', err);
  } finally {
    await client.end();
  }
}

checkDb();
