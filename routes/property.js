let express = require('express');
let router = express.Router();
let async = require('async');
let Property = require('../models/propertySchema');

router.get('/properties', function (req, res, next) {
    if (typeof req.query.filter !== 'undefined') {
        // let bugetRange = {
        //     low: req.query.budgetLow,
        //     high: req.query.budgetHigh,
        // };
        // let distanceRange = {
        //
        // };
        let bedroomsSelector = (req.query.bedrooms) ? "$in" : "$nin";
        let bedrooms = [] || [req.query.bedrooms];
        let purchasePriceSelector = (req.query.purchasePrice) ? "$in" : "$nin";
        let purchasePrice = [] || [req.query.purchasePrice];
        console.log(bedroomsSelector);
        console.log(purchasePriceSelector);
        //For boolean types:
        let furnishedChoice = "none";
        if(typeof req.query.furnished !== 'undefined'){
            if(req.query.furnished == "true" || req.query.furnished == true){
                furnishedChoice = false;
            }
            else{
                furnishedChoice = true;
            }
        }
        let gardenChoice = "none";
        if(typeof req.query.garden !== 'undefined'){
            if(req.query.garden == "true" || req.query.garden == true){
                gardenChoice = false;
            }
            else{
                gardenChoice = true;
            }
        }
        let storageChoice = "none";
        if(typeof req.query.storage !== 'undefined'){
            if(req.query.storage == "true" || req.query.storage == true){
                storageChoice = false;
            }
            else{
                storageChoice = true;
            }
        }
        let carParkChoice = "none";
        if(typeof req.query.carPark !== 'undefined'){
            if(req.query.carPark == "true" || req.query.carPark == true){
                carParkChoice = false;
            }
            else{
                carParkChoice = true;
            }
        }
        console.log(carParkChoice,storageChoice,gardenChoice);
        async.waterfall([
            function (callback) {
                console.log("enter into 1st");
                Property.find({
                    furnished : {
                        $nin : [furnishedChoice]
                    },
                    garden:{
                        $nin: [gardenChoice]
                    },
                    storage: {
                        $nin: [storageChoice]
                    },
                    parkingSpace: {
                        $nin : [carParkChoice]
                    },
                    bedrooms : {
                        bedroomsSelector :  bedrooms
                    },
                    purchasePrice : {
                        purchasePriceSelector : purchasePrice
                    }
                },function (err, data) {
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);
                    } else if(!data.length) {
                        console.log("warning");
                        res.status(403).json({
                            "info": "Can't retrieve data on filter"
                        });
                    } else {
                        callback(null,data);
                    }
                });

            },
            function (data,callback) {
                let budgetRange = {
                    low: req.query.budgetLow,
                    high: req.query.budgetHigh,
                };
                let distanceRange = {
                    low: req.query.distanceLow,
                    high: req.query.distanceHigh
                };
                let resultArray = [];
                for(let i = 0; i<data.length;++i){
                    let take = true;
                    take  = true && (typeof budgetRange.low !== 'undefined' && data.budget >= budgetRange.low);
                    take  = true && (typeof budgetRange.high !== 'undefined' && data.budget <= budgetRange.high);
                    take  = true && (typeof distanceRange.low !== 'undefined' && data.budget >= distanceRange.low);
                    take  = true && (typeof distanceRange.high !== 'undefined' && data.budget <= budgetRange.high);

                    if(take)
                        resultArray.push(data[i]);
                }
                callback(null,resultArray);
            }
        ], function (err, resultArray) {
            if (err) {
                res.status(500).json(err);
            }
            else if(!resultArray.length){
                res.status(404).json({
                    'info': 'No properties found'
                });
            }
            else {
                console.log('done');
                res.status(200).json({
                    data: resultArray
                });
            }
        });
    }
    else {
        Property.find({}, function (err, data) {
            if (err) {
                res.status(500).json(err);
            } else if (!data.length) {
                res.status(404).json({
                    'info': 'No properties found'
                });
            } else {
                res.status(200).json(data);
            }
        });
    }
});

router.get('/properties/department/:typeOfDepartment', function (req, res, next) {
    let typeOfDepartment = req.params.typeOfDepartment;
    Property.find({
        typeOfDepartment: typeOfDepartment.toLowerCase()
    }, function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else if (!data.length) {
            res.status(404).json({
                'info': 'No properties found on specific Type'
            });
        } else {
            res.status(200).json(data);
        }
    });
});

router.get('/city/:cityName', function (req, res, next) {
    let cityName = req.params.cityName;
    Property.find({
        city: cityName.toLowerCase()
    }, function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else if (!data.length) {
            res.status(404).json({
                'info': 'No properties found on specific City'
            });
        } else {
            res.status(200).json(data);
        }
    })
});

module.exports = router;