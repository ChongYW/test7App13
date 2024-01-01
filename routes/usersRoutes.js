var express = require('express');
var router = express.Router();
const userController = require("../controllers/userControllers");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.route("/").get(userController.getAllUsers).post(userController.createUser);

router.route("/:id").get(userController.getUser).put(userController.updateUser).delete(userController.deleteUser);

module.exports = router;
