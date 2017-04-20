const router = require('express').Router();
const model = require('../database/queries');
const Moment = require('moment');

const time = new Moment().format('YYYY-MM-DD HH:mm:ss');

router.get('/', (req, res) => {
  const queries = [model.getAuctions(3, time, '>'), model.getAuctions(3, time, '<'), model.featuredArt()];
  Promise.all(queries)
  .then((fufilled) => {
    const data = {};
    data.current = fufilled[0];
    data.expired = fufilled[1];
    data.featuredArt = fufilled[2];
    console.log('request body in home: ', req.body);
    if (req.body) {
        data.user = {
          username: res.body.username, 
          userId: res.body.userId
        };
    }
    res.status(200).json(data);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

module.exports = router;
