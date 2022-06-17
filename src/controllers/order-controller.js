'use strict'

const ValidationContract = require('../validators/fluent-validator');
const Repository = require('../repositories/order-repository');
const Guid = require('guid');

exports.get = async (req, res, next) => {
    try {
    var data = await Repository.get();
    res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    } 
}

exports.post = async (req, res, next) => {
    try {
        await Repository.create({
            customer: req.body.customer,
            number: Guid.raw().substring(),
            items: req.body.items
        })
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    } 
};