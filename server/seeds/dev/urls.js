exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => {
    return Promise.all([
      knex('urls').insert({
        id: "HkrRLh2Ge",
        long_url: "https://nodejs.org/en/",
        clicks: 5,
        folder_id: 1,
        created_at: Date.now()
      }),
      knex('urls').insert({
        id: "asdfjkl",
        long_url: "http://frontend.turing.io",
        clicks: 2,
        folder_id: 2,
        created_at: Date.now()
      }),
      knex('urls').insert({
        id: "qwerty",
        long_url: "http://www.nytimes.com",
        clicks: 25,
        folder_id: 2,
        created_at: Date.now()
      })
    ]);
  });
};
