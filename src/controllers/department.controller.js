'use strict';

const ValidationContract = require('../validators/fluid.validator');
const Repository = require('../repositories/department.repository');
const { getPagination } = require('../middlewares/pagination');

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

    if (!data) return res.status(400).json({ error: 'Departmento não localizado.' })

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao processar requisição. ' + e.message
    });
  }
};

exports.post = async (req, res, next) => {
  let contract = new ValidationContract();

  contract.hasMinLen(req.body.description, 2, 'A descrição do departamento deve conter no minimo 3 caracteres');

  if (!contract.isValid())
    return res.status(400).json(contract.errors()).end();

  try {
    const department = await Repository.findOrCreate(req.body);

    res.status(201).json(department);
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao cadastrar Departmento, ' + e.message
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
      message: 'Falha ao atualizar Departmento, ' + e
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await Repository.destroy(req.params.id);

    res.status(200).json({
      message: 'Departmento removido com sucesso!'
    });
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao remover Departmento'
    });
  }
};
