'use strict';

const Repository = require('../repositories/readingPrinter.repository');
const PrinterRepository = require('../repositories/printer.repository');
const { getPagination } = require('../middlewares/pagination');

const snmpService = require('../services/snmp.service');

exports.get = async (req, res, next) => {
  try {
    const { page, size } = req.params;
    const { limit, offset } = getPagination(page, size);

    const data = await Repository.findAll(page, limit, offset);

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

    if (!data) return res.status(400).json({ error: 'Leituras não localizado.' })

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao processar requisição. ' + e.message
    });
  }
};

exports.post = async (req, res, next) => {
  try {
    const printers = await PrinterRepository.findAllUnpaginate();

    printers.forEach(async printer => {
      var OID = [];
      var VARIABLE_OID = [];
      printer.oids.forEach(async oid => {
        OID.push(oid.oid_code);
        VARIABLE_OID.push(oid.description)
      })

      var data = await snmpService.collectDataOfPrinter(OID, VARIABLE_OID, printer);

      if (data) {
        await Repository.findOrCreate({
          printer_id: printer.id,
          mono: data.mono,
          scan: 0,
          color: !printer.mono ? data.color : 0,
          drum_life: data.drum_capacity ? (Math.floor((data.drum_life / data.drum_capacity) * 100)) : 0,
          readingDate: Date.now()
        });
      }
    });
    res.status(201).json({});
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao cadastrar Leituras, ' + e.message
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
      message: 'Falha ao atualizar Leituras, ' + e
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await Repository.destroy(req.params.id);

    res.status(200).json({
      message: 'Leituras removido com sucesso!'
    });
  } catch (e) {
    res.status(500).json({
      message: 'Falha ao remover Leituras'
    });
  }
};

