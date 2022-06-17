'use strict';

const ValidationContract = require('../validators/fluent-validator');
const Repository = require('../repositories/product-repository');

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

exports.getBySlug = async (req, res, next) => {
    try {
    var data = await Repository.getBySlug(req.params.slug);
    res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    } 
}

exports.getById = async(req, res, next) => {
    try { 
        var data = await Repository.getById(req.params.id)
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    } 
};

exports.getByTag = async (req, res, next) =>{
    try {
        var data = await Repository.getByTag(req.params.tag);
        res.status(200).send(data);
        } catch (e) {
            res.status(500).send({
                message: "Falha ao processar sua requisição"
            });
        } 
};

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();

    contract.hasMinLen(req.body.title, 3, "O título deve ter pelo menos 3 caracteres");
    contract.hasMinLen(req.body.slug, 3, "O slug deve ter pelo menos 3 caracteres");
    contract.hasMinLen(req.body.description, 3, "A descrição deve ter pelo menos 3 caracteres");
    
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await Repository.create(req.body)
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    } 
};

exports.put = async (req, res, next) =>{
    try {
        await Repository
        .update(req.params.id, req.body)
        res.status(200).send({
            message: "Produto atualizado com sucesso!" 
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    } 
};

exports.delete = async (req, res, next) =>{
    try {
        await Repository.delete(req.body.id)
        res.status(200).send({
            message: "Produto removido com sucesso!" 
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    } 
};