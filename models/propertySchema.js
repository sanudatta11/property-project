/**
 * Created by root on 14/7/18.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var propertySchema = new Schema({
        title:{
            type: String,
            required: true
        },
        "description":{
            type: String,
            required: true
        },
        "typeOfDepartment":{
            type: String,
            required: true
        },
        "city":{
            type: String,
            required: true
        },
        "numberOfFloors":{
            type: Number,
            required: true
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
            type: Number,
            required: true
        },
        "rooms":{
            type: String,
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
            type: Boolean,
            required: true
        },
        "garden":{
            type: Boolean,
            required: true,
            default: true
        },
        "purchasePrice":{
            type: Number,
            required: true
        },
        "brokerFee":{
            type: Number,
            required: true
        },
        "constructionYear":{
            type: Number,
            required: true
        },
        "propertyState":{
            type: String,
            required: true
        },
        "heating":{
            type: Boolean,
            required: true
        },
        "qualityInterior":{
            type: String,
            required: true
        },
        "energyCertificate":{
            type: Boolean,
            required: true
        },
        "balcony":{
            type: Boolean,
            required: true
        },
        "availability":{
            type: Boolean,
            required: true
        },
        "availableDate":{
            type: Date,
            required: true
        },
        "availableDuration":{
            type: Number,
            required: true
        },
        "rentalYield":{
            type: Number,
            required: true
        },
        "guaranteedRentalYield":{
            type: Boolean,
            required: true
        },
        "zipCode":{
            type: Number,
            required: true
        },
        "direction":{
            type: String,
            required: true
        },
        "images":{
            type: String,
            required: true
        },
        "latitude":{
            type: Double,
            required: true
        },
        "longitude":{
            type: Double,
            required: true
        },
        "address":{
            type: String,
            required: true
        },
        "distanceToCityCenter":{
            type: String
        },
        "furnished":{
            type: Boolean,
            required: true
        },
        "storage":{
            type: Boolean,
            required: true
        },
        "mapping":{
        type: String
        },
        "studio":{
            type: Boolean,
            required: true
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
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Property', propertySchema);
