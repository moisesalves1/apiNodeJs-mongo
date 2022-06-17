'use strict';

var config = require('../config');
var sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async(to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'INSERT E-MAIL',
        subject: subject,
        html: body
    })
};