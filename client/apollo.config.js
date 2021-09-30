module.exports = {
  client: {
    service: {
      name: 'justnote',
      localSchemaFile: './graphql.schema.json',
    },
    excludes: ['**/generated/**'],
  },
};
