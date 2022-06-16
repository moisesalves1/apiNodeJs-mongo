'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const Repository = require('../repositories/product-repository');

exports.get = ((req, res, next) =>{
    Repository
        .get()
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });;
});

exports.getBySlug = ((req, res, next) =>{
    Repository
        .getBySlug(req.params.slug)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });;
});

exports.getById = ((req, res, next) =>{
    Repository.getById(req.params.id).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });;
});

exports.getByTag = ((req, res, next) =>{
    Repository
        .getByTag(req.params.tag)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
});

exports.post = ((req, res, next) => {
    let contract = new ValidationContract();

    contract.hasMinLen(req.body.title, 3, "O título deve ter pelo menos 3 caracteres");
    contract.hasMinLen(req.body.slug, 3, "O slug deve ter pelo menos 3 caracteres");
    contract.hasMinLen(req.body.description, 3, "A descrição deve ter pelo menos 3 caracteres");
    
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    Repository.create(req.body)
    .then(x => {
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao cadastrar o produto', 
            data: e
        });
    });
    
});

exports.put = ((req, res, next) =>{
    Repository
    .update(req.params.id, req.body)
    .then(data => {
        res.status(200).send({
            message: "Produto atualizado com sucesso!" 
        });
    }).catch(e => {
        res.status(400).send({
            message: "Produto atualizado com sucesso!",
            data: e
        });
    });;
});

exports.delete = ((req, res, next) =>{
    Repository.delete(req.body.id)
    .then(data => {
        res.status(200).send({
            message: "Produto removido com sucesso!" 
        });
    }).catch(e => {
        res.status(400).send({
            message: "Falha ao remover produto!",
            data: e
        });
    });;
});