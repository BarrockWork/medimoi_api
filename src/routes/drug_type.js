var express = require('express');
var router = express.Router();


router.post("/new", function(req, res, next){
    res.end('Ceci est un POST !');
});

router.get('/', function(req, res, next){
    res.end('Ceci est un GET !');
});

router.get('/:id', function(req, res, next){
    res.end('Ceci est un GET avec un ID !');
});
router.put('/:id/edit', function(req, res, next){
    res.end('Ceci est un PUT !');
});

router.delete('/:id/delete', function(req, res, next){
    res.end('Ceci est un DELETE !');
});


module.exports = router;