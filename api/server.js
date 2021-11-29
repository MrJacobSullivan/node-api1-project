const express = require('express');
const Users = require('./users/model');

const server = express();

server.use(express.json());

// [POST] /api/users
// creates a user using the information sent inside the `request body`

// [GET] /api/users
// returns an array

server.get('/api/users', async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'The users information could not be retrieved', error: err.message });
  }
});

// [GET] /api/users/:id
// returns the user object with the specified `id`

// [DELETE] /api/users/:id
// removes the user with the specified `id` and returns the deleted user

// [PUT] /api/users/:id
// updates the user with the specified `id` using data from the `request body`
// returns the modified user

module.exports = server;
