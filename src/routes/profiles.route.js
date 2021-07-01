'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/profile.controller');
const { authorize } = require('../services/auth.service');

router.get('/:page/:size', authorize, controller.get);
router.post('/', authorize, controller.post);
router.post('/:profile_id/roles', authorize, controller.roles); //adicionar regras ao perfil

router.get('/:id', authorize, controller.getById);
router.put('/:id', authorize, controller.put);
router.delete('/:id', authorize, controller.delete);

module.exports = router;
