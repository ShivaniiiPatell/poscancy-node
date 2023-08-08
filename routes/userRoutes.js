const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.post("/login", userController.login);
router.post("/", userController.addUser);
router.get("/", auth.authentication, userController.getAllUsers);
router.put("/:id/deactivate", userController.deactivateUser);
module.exports = router;
