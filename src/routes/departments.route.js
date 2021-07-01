'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/department.controller');
const { authorize } = require('../services/auth.service');

router.get('/:page/:size', authorize, controller.get);
router.post('/', authorize, controller.post);
router.get('/:id', authorize, controller.getById);
router.put('/:id', authorize, controller.put);
router.delete('/:id', authorize, controller.delete);

module.exports = router;
