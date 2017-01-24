exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        id: 1,
        name: 'Node',
        created_at: Date.now()
      }),
      knex('folders').insert({
        id: 2,
        name: 'Kittens',
        created_at: Date.now()
      })
    ]);
  });
};
