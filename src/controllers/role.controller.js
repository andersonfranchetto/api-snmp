'use strict';

const Repository = require('../repositories/role.repository');
const { getPagination } = require('../middlewares/pagination');

exports.get = async (req, res, next) => {
  try {
    const { page, size } = req.params;
    const { limit, offset } = getPagination(page, size);

    var data = await Repository.findAll(page, limit, offset);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao processar requisição.'
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const data = await Repository.findByPk(req.params.id);

    if (!data) return res.status(400).json({ error: 'Regra não localizada.' })

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao processar requisição.'
    });
  }
};

exports.post = async (req, res, next) => {
  try {
    const role = await Repository.findOrCreate(req.body);

    res.status(201).json(role);
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao cadastrar Role, ' + e
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
      message: 'Falha ao atualizar Role, ' + e
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await Repository.destroy(req.params.id);

    res.status(200).json({
      message: 'Role removido com sucesso!'
    });
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao remover Role'
    });
  }
};
