'use strict';

const ValidationContract = require('../validators/fluent-validator');
const Repository = require('../repositories/product-repository');
const Azure = require('azure-storage');
const guid = require('guid');
var config = require('../config');

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
        const blobSvc = Azure.createBlobService(config.userImagesBlobConnectionString)

        let filename = guid.raw().toString() + '.jpg';
        let rawdata = req.body.image;
        let matches = rawdata.match(/^data:([A-Za-z+-\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');

        await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
            contentType: type,
        }, function (error, result, response) {
            if (error) {
                filename='default-product.png';
            }
        });

        await Repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
            image: 'https://nodeapi.blob.core.windows.net/product-images/' + filename
        })
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (e) {
        console.log(e);
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