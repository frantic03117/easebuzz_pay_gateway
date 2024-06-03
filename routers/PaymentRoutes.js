const express = require('express')
const routes = express.Router();



const controller = require('../Controllers/PaymentController');
const { body } = require('express-validator');
const validation = [
    body('firstname').notEmpty().trim(),
    body('email').notEmpty().trim(),
    body('phone').notEmpty().trim(),
    body('amount').notEmpty().trim(),
    body('productinfo').notEmpty().trim()
];

routes.post('/', validation, controller.submit_form);
routes.post('/init', controller.init_payment);
routes.get('/success', controller.response_success);


module.exports = routes;
