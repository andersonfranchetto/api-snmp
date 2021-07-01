'use strict';

const authService = require('../services/auth.service');
const User = require('../repositories/user.repository');
const ValidationContract = require('../validators/fluid.validator');

exports.authenticate = async (req, res, next) => {
  let contract = new ValidationContract();
  contract.isEmail(req.body.email, 'Emal inválido');
  contract.hasMinLen(req.body.password, 8, 'A Senha deve conter no minimo 8 dígitos');

  if (!contract.isValid())
    return res.status(400).json(contract.errors()).end();

  try {

    const user = await User.authenticate(req.body.email, req.body.password);

    if (!user) return res.status(401).json({ message: 'Usuário ou senha inválidos' });

    const token = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      profile: user.profile_id
    });

    const data = await authService.decodeToken(token);

    res.cookie('token', token, { expires: new Date(Date.now() + ((data.exp - data.iat) * 1000)), httpOnly: true });

    res.status(201).json({
      token: token,
      user: {
        email: user.email,
        name: user.name
      }
    });
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao acessar, ' + e.message
    });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    const user = await User.findByEmail(data.email);

    if (!user) {
      res.status(404).send({
        message: 'Usuário nao encontrado'
      });
      return;
    }
    const tokenData = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      roles: user.roles
    })

    res.status(200).send({
      token: tokenData,
      data: {
        email: user.email,
        name: user.name
      }
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao acessar, ' + e.message
    });
  }
};
