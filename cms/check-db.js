const { Client } = require('pg');

const client = new Client({
  host: '127.0.0.1',
  port: 5432,
  database: 'ambient_cms',
  user: 'postgres',
  password: 'Uday@8484'
});

client.connect()
  .then(() => {
    console.log('Database connection successful!');
    return client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
  })
  .then(res => {
    const tables = res.rows.map(row => row.table_name);
    console.log(`Found ${tables.length} tables in the public schema.`);
    if (tables.length > 0) {
      console.log('Tables:', tables.join(', '));
    } else {
      console.log('No tables found. Strapi will create them when it starts up.');
    }
    process.exit(0);
  })
  .catch(err => {
    console.error('Failed to connect or query database:', err.message);
    process.exit(1);
  });
