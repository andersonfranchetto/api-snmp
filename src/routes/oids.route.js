'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/oid.controller');
const { authorize } = require('../services/auth.service');

router.get('/:page/:size', authorize, controller.get);
router.post('/', authorize, controller.post);
// router.post('/:printer_id/management', authorize, controller.management); //adicionar oids

router.get('/:id', authorize, controller.getById);
router.put('/:id', authorize, controller.put);
router.delete('/:id', authorize, controller.delete);

module.exports = router;
