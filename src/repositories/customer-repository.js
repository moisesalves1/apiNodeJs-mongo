'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async(data) => {
    var res = await Customer.find({}, 'name email');
    return res;
}

exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();
}

exports.authenticate = async(data) => {
    var res = await Customer.findOne({
        email: data.email, 
        password: data.password
    });
    return res;
}

exports.getById = async(id) => {
    var res = await Customer.findById(id);
    return res;
}