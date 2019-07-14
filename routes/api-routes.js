//variable to require our models
var db = require("../models");

//====================Routes======================
module.exports = function(app) {

    //GET route for getting all of the burgers
    app.get("/api/burgers", function(req, res){
        //get all burgers entries
        db.Burger.findAll({}).then(function(result){
            res.json(result);
        });
    });

    //POST routes for adding new burgers
    app.post("/api/burgers", function(req, res){
        //create new burgers 
        db.Burger.create({
            burger_name: req.body.burger_name,
            devoured: req.body.devoured
        }).then(function(results) {
        res.json(results);
        });
    });

    //DELETE route for deleting burgers by getting the id of the burger.
    app.delete("/api/burgers/:id", function(req, res) {
        // Destroy takes in one argument: a "where object describing the burgers we want to destroy
        db.Burger.destroy({
          where: {
            id: req.params.id
          }
        })
          .then(function(result) {
            res.json(result);
          });
    
      });

      // PUT route for updating burgers. 
  app.put("/api/burgers", function(req, res) {
    
    db.Burger.update({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }, {
      where: {
        id: req.body.id
      }
    })
      .then(function(result) {
        res.json(result);
      });

  });


};