return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        id: 1,
        name: 'Node'
      }),
      knex('folders').insert({
        id: 2,
        name: 'Kittens'
      })
    ]);
  });
