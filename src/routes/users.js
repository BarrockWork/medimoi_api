var express = require('express');
var router = express.Router();

const action = () => {};


router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/new', action);

router.put('/:id', action);

router.delete('/:id', action);

router.get('/:id', action);

module.exports = router;
