'use strict'

const ValidationContract = require('../validators/fluent-validator');
const Repository = require('../repositories/customer-repository');
const md5 = require('md5');

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
    let contract = new ValidationContract();

    contract.hasMinLen(req.body.name, 3, "O nome deve ter pelo menos 3 caracteres");
    contract.isEmail(req.body.email, 3, "E-mail inválido");
    contract.hasMinLen(req.body.password, 6, "A senha deve ter pelo menos 6 caracteres");
    
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await Repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    } 
};