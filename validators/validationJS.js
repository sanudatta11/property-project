let express = require('express');
let router = express.Router();
let async = require('async');
let Property = require('../models/propertySchema');
let validator = require('validator');
let config = require('../configVariables');
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
    let errors = [];
    if(!((typeof req.body.city !== 'undefined') && !validator.isEmpty(req.body.city)))
    {
        valid = false;
        errors.push("Validation failed on city attribute");
    }
    if(!((typeof req.body.title !== 'undefined') && !validator.isEmpty(req.body.title)))
    {
        valid = false;
        errors.push("Validation failed on title attribute");
    }
    if(!((typeof req.body.bedrooms !== 'undefined') && validator.isInt(req.body.bedrooms,{min:config.variables.bedroomsMin})))
    {
        valid = false;
        errors.push("Validation failed on bedrooms attribute");
    }
    if(!((typeof req.body.availableDate !== 'undefined') && !validator.isEmpty(req.body.availableDate) && validator.isAfter(req.body.availableDate)))
    {
        valid = false;
        errors.push("Validation failed on availableDate attribute");
    }
    if(!((typeof req.body.propertyState !== 'undefined') && !validator.isEmpty(req.body.propertyState)))
    {
        valid = false;
        errors.push("Validation failed on propertyState attribute");
    }
    if(!((typeof req.body.rooms !== 'undefined') && validator.isInt(req.body.rooms,{min:config.variables.roomsMin})))
    {
        valid = false;
        errors.push("Validation failed on rooms attribute");
    }
    if(!((typeof req.body.price !== 'undefined') && validator.isInt(req.body.price,{min:config.variables.priceMin})))
    {
        valid = false;
        errors.push("Validation failed on price attribute");
    }
    if(!((typeof req.body.bathrooms !== 'undefined') && validator.isInt(req.body.bathrooms,{min:config.variables.bathroomsMin})))
    {
        valid = false;
        errors.push("Validation failed on bathrooms attribute");
    }
    if(!((typeof req.body.totalAreas !== 'undefined') && validator.isInt(req.body.totalAreas,{min:config.variables.totalAreasMin})))
    {
        valid = false;
        errors.push("Validation failed on totalAreas attribute");
    }
    if (!((typeof req.body.livingSpace !== 'undefined') && validator.isInt(req.body.livingSpace,{min:config.variables.livingSpaceMin})))
    {
        valid = false;
        errors.push("Validation failed on livingSpace attribute");
    }
    if(!((typeof req.body.energyCertificate !== 'undefined') && validator.isBoolean(req.body.energyCertificate)))
    {
        valid = false;
        errors.push("Validation failed on energyCertificate attribute");
    }
    console.log(valid);
    if(valid == true)
        callback(null);
    else
        callback(errors);
};


module.exports = router;