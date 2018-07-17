/**
 * Created by root on 14/7/18.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var propertySchema = new Schema({
        "title":{
            type: String,
            required: true
        },
        "description":{
            type: String
        },
        "typeOfDepartment":{
            type: String
        },
        "city":{
            type: String,
            required: true
        },
        "numberOfFloors":{
            type: Number
        },
        "livingSpace":{
            type: Number,
            required: true
        },
        "totalAreas":{
            type: Number,
            required: true
        },
        "usableArea":{
            type: Number
        },
        "rooms":{
            type: Number,
            required: true
        },
        "bedrooms":{
            type: Number,
            required: true
        },
        "bathrooms":{
            type: Number,
            required: true
        },
        "parkingSpace":{
            type: Boolean
        },
        "garden":{
            type: Boolean
        },
        "purchasePrice":{
            type: Number
        },
        "brokerFee":{
            type: Number
        },
        "constructionYear":{
            type: Number
        },
        "propertyState":{
            type: String,
            required: true
        },
        "heating":{
            type: Boolean
        },
        "qualityInterior":{
            type: String
        },
        "energyCertificate":{
            type: Boolean,
            required: true
        },
        "balcony":{
            type: Boolean
        },
        "availability":{
            type: Boolean
        },
        "availableDate":{
            type: Date,
            required: true
        },
        "rentalYield":{
            type: Number
        },
        "guaranteedRentalYield":{
            type: Boolean
        },
        "zipCode":{
            type: Number
        },
        "direction":{
            type: String
        },
        "images":[{
            type: String
        }],
        "latitude":{
            type: Number
        },
        "longitude":{
            type: Number
        },
        "address":{
            type: String
        },
        "distanceToCityCenter":{
            type: Number
        },
        "furnished":{
            type: Boolean
        },
        "storage":{
            type: Boolean
        },
        "mapping":{
            type: String
        },
        "studio":{
            type: Boolean
        },
        "aboutProperty":{
            type: String
        },
        "propertyManagement":{
            type: String
        },
        "financing":{
            type: Boolean
        },
        "welcomeNote":{
            type: String
        },
        "price": {
            type: Number,
            required: true
        },
        "companyLogo":{
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Property', propertySchema);
