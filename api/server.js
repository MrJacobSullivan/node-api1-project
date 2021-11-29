const express = require('express');
const Users = require('./users/model');

const server = express();

server.use(express.json());

// [POST] /api/users
// creates a user using the information sent inside the `request body`

server.post('/api/users', async (req, res) => {
  const { body } = req;

  try {
    if (!body.name || !body.bio) {
      res.status(400).json({ message: 'Please provide name and bio for the user' });
    } else {
      const user = await Users.insert(body);
      res.status(201).json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: 'There was an error while saving the user to the database',
      error: err.message,
    });
  }
});

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

server.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);
    if (!user) {
      res.status(404).json({ message: 'The user with the specified ID does not exist' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: 'The user information could not be retrieved', error: err.message });
  }
});

// [DELETE] /api/users/:id
// removes the user with the specified `id` and returns the deleted user

// [PUT] /api/users/:id
// updates the user with the specified `id` using data from the `request body`
// returns the modified user

module.exports = server;
