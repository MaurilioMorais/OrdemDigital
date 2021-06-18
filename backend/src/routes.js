const express = require('express');

const AtController = require('./controllers/AtController');
const OrdemController = require('./controllers/OrdemController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ats', AtController.index);
routes.post('/ats', AtController.create);

routes.get('/profile', ProfileController.index);

routes.get('/ordens', OrdemController.index);
routes.post('/ordens', OrdemController.create);
routes.delete('/ordens/:id', OrdemController.delete);

module.exports = routes;
