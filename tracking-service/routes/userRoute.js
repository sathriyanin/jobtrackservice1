const express = require('express');
const UserService = require('../services/userService');

const router = express.Router();

router.route("/:userId")
    .get(UserService.getUserById)
    .delete(UserService.deleteUser);

module.exports = router;