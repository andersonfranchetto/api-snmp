'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/authentication.controller');
const { authorize } = require('../services/auth.service');

router.post('/', controller.authenticate);
router.post('/refreshToken', authorize, controller.refreshToken);

module.exports = router;

