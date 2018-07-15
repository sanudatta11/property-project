let express = require('express');
let router = express.Router();
let async = require('async');
let Property = require('../models/propertySchema');
let validator = require('validator');

/**
 * Mandatory Requirements
 * Property Title,
 * City
 * bedrooms
 * available date
 * property state
 * rooms
 * Bathroom
 * Total Areas
 * Living Space
 * energy certificate
 * */

router.validCompany = function (req, callback) {
    let valid = true;
    valid = valid && !validator.isEmpty(req.body.title);
    valid = valid && !validator.isEmpty(req.body.city);
    valid = valid && !validator.isInt(req.body.bedrooms,{$gte:1});
    valid = valid && !validator.isEmpty(req.body.availableDate) && validator.isAfter(req.body.availableDate);
    valid = valid && !validator.isEmpty(req.body.propertyState);
    valid = valid && !validator.isInt(req.body.rooms,{$gte:1});
    valid = valid && !validator.isInt(req.body.price,{$gte:1});
    valid = valid && !validator.isInt(req.body.bathrooms,{$gte:1});
    valid = valid && !validator.isInt(req.body.totalAreas,{$gte:1});    //Add ur specified minimum and max area
    valid = valid && !validator.isInt(req.body.livingSpace,{$gte:1});
    valid = valid && !validator.isBoolean(req.body.energyCertificate);


    if(valid)
        callback(null);
    else
        callback("Validation failed")
};


module.exports = router;