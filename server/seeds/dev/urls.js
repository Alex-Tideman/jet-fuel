return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('urls').insert({
        id: 1,
        name: 'Node'
      }),
      knex('urls').insert({
        id: 2,
        name: 'Kittens'
      }),
      knex('urls').insert({
        id: 2,
        name: 'Kittens'
      })
    ]);
  });
