const express = require('express');

const PizzaController = require('./controllers/PizzaController');

const routes = express.Router();

routes.get('/pizzas', PizzaController.index);
routes.get('/pizzas/result', PizzaController.resultPizzas);
routes.post('/pizzas', PizzaController.create);
routes.get('/pizzas/suggestion', PizzaController.pizzaSuggestion);

module.exports = routes;