'use strict';

const Repository = require('../repositories/profile.repository');
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

    if (!data) return res.status(400).json({ error: 'Perfil não localizado.' })

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao processar requisição.' + e
    });
  }
};

exports.post = async (req, res, next) => {
  try {
    const profile = await Repository.findOrCreate(req.body);

    res.status(201).json(profile);
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao cadastrar Perfil, ' + e.message
    });
  }
};

exports.roles = async (req, res, next) => {
  try {
    const profile = await Repository.findByPk(req.params.profile_id);

    if (!profile) return res.status(400).json({ error: 'Perfil não localizado' });

    await Repository.roles(req.body.roles, profile);

    res.status(201).json({ message: 'Regras adicionadas ao perfil.' });
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao cadastrar Regra no perfil, ' + e
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
      message: 'Falha ao atualizar Perfil, ' + e
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await Repository.destroy(req.params.id);

    res.status(200).json({
      message: 'Perfil removido com sucesso!'
    });
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao remover Perfil, ' + e
    });
  }
};
