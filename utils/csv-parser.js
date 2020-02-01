const csv = require('csv-parser');
const fs = require('fs');

const transform = (data) => {
  return Object.keys(data).map(k => data[k]);
}

const parseCsv = (name) => {
  const results = [];

  return new Promise(async (resolve, reject) => {
    fs.createReadStream(`./src/data/${name}.csv`)
      .pipe(csv(
        {
          mapValues: ({ header, index, value }) => value,
          headers: []
        }
      ))
      .on('data', (data) => {
        results.push(transform(data))
      })
      .on('end', () => {
        resolve(results);
      });

  })
};


parseCsv('Affinity').then(x => {
  console.log(x);
});

parseCsv('Advocacy').then(x => {
  console.log(x);
});
