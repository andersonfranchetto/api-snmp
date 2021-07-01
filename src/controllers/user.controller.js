'use strict';

const ValidationContract = require('../validators/fluid.validator');
const { getPagination } = require('../middlewares/pagination');

const Repository = require('../repositories/user.repository');

exports.get = async (req, res, next) => {
  try {
    const { page, size } = req.params;
    const { limit, offset } = getPagination(page, size);

    var data = await Repository.findAll(page, limit, offset);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao processar requisição. ' + e.message
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const data = await Repository.findByPk(req.params.id);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao processar requisição. ' + e.message
    });
  }
};

exports.post = async (req, res, next) => {
  let contract = new ValidationContract();
  // contract.hasMinLen(req.body.name, 3, 'O Nome deve conter no minimo 3 caracteres');
  contract.hasMinLen(req.body.password, 8, 'A Senha deve conter no minimo 8 dígitos');
  contract.isEmail(req.body.email, 'Emal inválido');

  if (!contract.isValid())
    return res.status(400).json(contract.errors()).end();

  try {
    const user = await Repository.findOrCreate(req.body);

    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao cadastrar Usuário, ' + e
    });
  }
};

exports.put = async (req, res, next) => {
  try {
    await Repository.update(req.params.id, req.body);

    res.status(200).json(
      { message: "Atualizado com sucesso!" }
    );
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao atualizar Usuário'
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await Repository.destroy(req.params.id);

    res.status(200).json({
      message: 'Usuário removido com sucesso!'
    });
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao remover Usuário, ' + e.message
    });
  }
};
