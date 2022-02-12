const express = require('express');
const router = express.Router();

const Drone = require('../models/Drone.model.js')
// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then((drones)=>{
      console.log("Those are all the drones: ");
      res.render("drones/list", {drones} )
    })
});

router
.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form")
})

router
.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const name = req.body.name;
  const propellers = req.body.propellers;
  const maxSpeed = req.body.maxSpeed

  Drone.create({name, propellers, maxSpeed})
  .then(()=> res.redirect("/drones"))
  .catch((error) => `Error while creating a new drone: ${error}`);
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const id = req.params.id;
  Drone.findById(id)
    .then((drone)=>{
      res.render("drones/update-form", drone)
    })
});


router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const name = req.body.name;
  const propellers = req.body.propellers;
  const maxSpeed = req.body.maxSpeed

  Drone.findOneAndUpdate({"_id": req.params.id} ,{name, propellers, maxSpeed})
  .then(()=> res.redirect("/drones"))
  .catch((error) => `Error while editing a new drone: ${error}`);
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const id = req.params.id;
  Drone.findByIdAndDelete(id)
  .then(()=>res.redirect("/drones"))
});

module.exports = router;
