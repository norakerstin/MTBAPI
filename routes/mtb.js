var express = require('express');
var router = express.Router();

//inkludera mongoose och mtbmodule:
var mongoose = require('mongoose');
var mtbmodule = require ('../modules/mtbmodule.js');

//GET
//req och res här är request- respektive response-objekten
router.get('/', function(req, res, next) {
  //find är Mongoose funktion. err innehåller eventuellt fel, annars kommer resultatet att finnas i “bilarna”
  mtbmodule.find(function (err, mtb) {
    if (err) return next(err);
    else {
    //Om det inte uppstår fel så skicka bilarna i jsonformat
    res.json(mtb);
    }
  });
});

//POST
router.post('/', function(req, res, next) {
    //req.body är innehållet i requestobjektet, dvs en json med en bil
    mtbmodule.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post); //Här skickar vi tillbaka datan vi skickar in i databasen, om skrivningen gick bra
    });
  });

  //DELETE
  router.delete('/:id', function(req, res, next) {
    mtbmodule.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
      });
    });

//UPDATE:
router.post('/:id', function(req, res, next) {
  mtbmodule.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
