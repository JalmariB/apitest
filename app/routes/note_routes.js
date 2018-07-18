var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {
    
    const collection =
        app.post('/notes', (req, res) => {
            const oma = 'oma testi';
            const note = {
                text: req.body.body,
                title: req.body.title,
                footer:req.body.footer,
                oma:oma
            };
            db.collection('notes').insert(note, (err, result) => {
                if (err) {
                    res.send({
                        'error': 'An error has occurred'
                    });
                } else {
                    res.send(result.ops[0]);
                }
            });
        });


        app.get('/notes/:id', (req, res) => {
          const id = req.params.id;
          const details = {
              '_id': new ObjectID(id)
          };
          db.collection('notes').findOne(details, (err, item) => {
              if (err) {
                  res.send({
                      'error': 'An error has occurred'
                  });
              } else {
                  console.log(res)
                  res.send(item);
              }
          });
        });
};