import 'dotenv/config';

export default {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: '_migrations',
      directory: './src/database/migrations',
      extension: 'ts',
    },
    seeds: { directory: './src/database/seeds' },
    debug: true,
  },
  production: {
    client: 'pg',
    connection: {
      port: 5432,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  },
};
