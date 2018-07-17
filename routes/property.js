let express = require('express');
let router = express.Router();
let async = require('async');
let Property = require('../models/propertySchema');
let validationJS = require('../validators/validationJS');
let validator = require('validator');

//Helper Functions


function allocator(req, property) {
    if ((typeof req.body.description !== 'undefined') && !validator.isEmpty(req.body.description))
        property.description = req.body.description;
    if ((typeof req.body.typeOfDepartment !== 'undefined') && !validator.isEmpty(req.body.typeOfDepartment))
        property.typeOfDepartment = req.body.typeOfDepartment;
    if ((typeof req.body.qualityInterior !== 'undefined') && !validator.isEmpty(req.body.qualityInterior))
        property.qualityInterior = req.body.qualityInterior;
    if ((typeof req.body.direction !== 'undefined') && !validator.isEmpty(req.body.direction))
        property.direction = req.body.direction;
    if ((typeof req.body.images !== 'undefined') && !validator.isEmpty(req.body.images) && validator.isURL(req.body.images))
        property.images = req.body.images;
    if ((typeof req.body.address !== 'undefined') && !validator.isEmpty(req.body.address))
        property.address = req.body.address;
    if ((typeof req.body.distanceToCityCenter !== 'undefined') && !validator.isInt(req.body.distanceToCityCenter))
        property.distanceToCityCenter = req.body.distanceToCityCenter;
    if ((typeof req.body.mapping !== 'undefined') && !validator.isEmpty(req.body.mapping))
        property.mapping = req.body.mapping;
    if ((typeof req.body.aboutProperty !== 'undefined') && !validator.isEmpty(req.body.aboutProperty))
        property.aboutProperty = req.body.aboutProperty;
    if ((typeof req.body.propertyManagement !== 'undefined') && !validator.isEmpty(req.body.propertyManagement))
        property.propertyManagement = req.body.propertyManagement;
    if ((typeof req.body.welcomeNote !== 'undefined') && !validator.isEmpty(req.body.welcomeNote))
        property.welcomeNote = req.body.welcomeNote;
    if ((typeof req.body.companyLogo !== 'undefined') && !validator.isEmpty(req.body.companyLogo))
        property.companyLogo = req.body.companyLogo;

    if ((typeof req.body.numberOfFloors !== 'undefined') && !validator.isInt(req.body.numberOfFloors))
        property.numberOfFloors = req.body.numberOfFloors;
    if ((typeof req.body.usableArea !== 'undefined') && !validator.isInt(req.body.usableArea))
        property.usableArea = req.body.usableArea;
    if ((typeof req.body.brokerFee !== 'undefined') && !validator.isInt(req.body.brokerFee))
        property.brokerFee = req.body.brokerFee;
    if ((typeof req.body.constructionYear !== 'undefined') && !validator.isInt(req.body.constructionYear))
        property.constructionYear = req.body.constructionYear;
    if ((typeof req.body.rentalYield !== 'undefined') && !validator.isInt(req.body.rentalYield))
        property.rentalYield = req.body.rentalYield;
    if ((typeof req.body.zipCode !== 'undefined') && !validator.isInt(req.body.zipCode) && validator.isPostalCode(req.body.zipCode))
        property.zipCode = req.body.zipCode;
    if ((typeof req.body.latitude !== 'undefined') && !validator.isInt(req.body.latitude))
        property.latitude = req.body.latitude;
    if ((typeof req.body.longitude !== 'undefined') && !validator.isInt(req.body.longitude))
        property.longitude = req.body.longitude;

    if ((typeof req.body.parkingSpace !== 'undefined') && !validator.isBoolean(req.body.parkingSpace))
        property.parkingSpace = req.body.parkingSpace;
    if ((typeof req.body.garden !== 'undefined') && !validator.isBoolean(req.body.garden))
        property.garden = req.body.garden;
    if ((typeof req.body.heating !== 'undefined') && !validator.isBoolean(req.body.heating))
        property.heating = req.body.heating;
    if ((typeof req.body.balcony !== 'undefined') && !validator.isBoolean(req.body.balcony))
        property.balcony = req.body.balcony;
    if ((typeof req.body.availability !== 'undefined') && !validator.isBoolean(req.body.availability))
        property.availability = req.body.availability;
    if ((typeof req.body.guaranteedRentalYield !== 'undefined') && !validator.isBoolean(req.body.guaranteedRentalYield))
        property.guaranteedRentalYield = req.body.guaranteedRentalYield;
    if ((typeof req.body.furnished !== 'undefined') && !validator.isBoolean(req.body.furnished))
        property.furnished = req.body.furnished;
    if ((typeof req.body.storage !== 'undefined') && !validator.isBoolean(req.body.storage))
        property.storage = req.body.storage;
    if ((typeof req.body.studio !== 'undefined') && !validator.isBoolean(req.body.studio))
        property.studio = req.body.studio;
    if ((typeof req.body.financing !== 'undefined') && !validator.isBoolean(req.body.financing))
        property.financing = req.body.financing;
};


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
        let bedrooms = (req.query.bedrooms) ? [parseInt(req.query.bedrooms)] : [];
        let purchasePriceSelector = (req.query.purchasePrice) ? "$in" : "$nin";
        let purchasePrice = (req.query.purchasePrice) ? [parseInt(req.query.purchasePrice)] : [];
        console.log(bedrooms);
        console.log(purchasePriceSelector);
        //For boolean types:
        let furnishedChoice = [];
        if (typeof req.query.furnished !== 'undefined') {
            if (req.query.furnished == "true" || req.query.furnished == true) {
                furnishedChoice = [false];
            }
            else {
                furnishedChoice = [true];
            }
        }
        let gardenChoice = [];
        if (typeof req.query.garden !== 'undefined') {
            if (req.query.garden == "true" || req.query.garden == true) {
                gardenChoice = [false];
            }
            else {
                gardenChoice = [true];
            }
        }
        let storageChoice = [];
        if (typeof req.query.storage !== 'undefined') {
            if (req.query.storage == "true" || req.query.storage == true) {
                storageChoice = [false];
            }
            else {
                storageChoice = [true];
            }
        }
        let carParkChoice = [];
        if (typeof req.query.carPark !== 'undefined') {
            if (req.query.carPark == "true" || req.query.carPark == true) {
                carParkChoice = [false];
            }
            else {
                carParkChoice = [true];
            }
        }
        console.log(carParkChoice, storageChoice, gardenChoice);
        async.waterfall([
            function (callback) {
                console.log("enter into 1st");
                Property.find({
                    furnished: {
                        $nin: furnishedChoice
                    },
                    garden: {
                        $nin: gardenChoice
                    },
                    storage: {
                        $nin: storageChoice
                    },
                    parkingSpace: {
                        $nin: carParkChoice
                    },
                    bedrooms: {
                        [bedroomsSelector]: bedrooms
                    },
                    purchasePrice: {
                        [purchasePriceSelector]: purchasePrice
                    }
                }, function (err, data) {
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);
                    } else if (!data.length) {
                        console.log("warning");
                        res.status(404).json({
                            "info": "Can't retrieve data on filter"
                        });
                    } else {
                        callback(null, data);
                    }
                });

            },
            function (data, callback) {
                let budgetRange = {
                    low: req.query.budgetLow,
                    high: req.query.budgetHigh,
                };
                let distanceRange = {
                    low: req.query.distanceLow,
                    high: req.query.distanceHigh
                };
                let resultArray = [];
                for (let i = 0; i < data.length; ++i) {
                    let take = true;
                    take = true && (typeof budgetRange.low == 'undefined' || data.price >= budgetRange.low);
                    take = true && (typeof budgetRange.high == 'undefined' || data.price <= budgetRange.high);
                    take = true && (typeof distanceRange.low == 'undefined' || data.distanceToCityCenter >= distanceRange.low);
                    take = true && (typeof distanceRange.high == 'undefined' || data.distanceToCityCenter <= budgetRange.high);

                    if (take)
                        resultArray.push(data[i]);
                }
                callback(null, resultArray);
            }
        ], function (err, resultArray) {
            if (err) {
                res.status(500).json(err);
            }
            else if (!resultArray.length) {
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

router.post('/createProperty', function (req, res, next) {
    validationJS.validCompany(req, function (errors) {
        if (errors === null) {
            let property = new Property({
                title: req.body.title,
                city: req.body.city,
                livingSpace: req.body.livingSpace,
                totalAreas: req.body.totalAreas,
                rooms: req.body.rooms,
                bedrooms: req.body.bedrooms,
                bathrooms: req.body.bathrooms,
                propertyState: req.body.propertyState,
                energyCertificate: req.body.energyCertificate,
                availableDate: req.body.availableDate,
                price: req.body.price
            });
            allocator(req,property);    //Helper Function

            property.save(function (savePropertyError, savedProperty) {
                if (savePropertyError) {
                    console.log(savePropertyError);
                    res.status(500).json({
                        info: "Property Save Error",
                        error: savePropertyError
                    });
                } else {
                    res.status(200).json({
                        info: "Property Saved",
                        data: savedProperty
                    })
                }
            });

        } else {
            //Required Validation failed
            res.status(400).json({
                info: "Bad Request! Validation failed on required attributes.",
                errors: errors
            });
        }
    });
});


router.post('/updateProperty/:pid', function (req,res,next) {
    let pid = req.params.pid;
    Property.findById(pid, function (err, property) {
        if (err) {
            res.status(500).json(err);
        } else if (!property) {
            res.status(404).json({
                'info': 'No properties found on specific Id'
            });
        } else {
            if ((typeof req.body.title !== 'undefined') && !validator.isEmpty(req.body.title))
                property.title = req.body.title;
            if ((typeof req.body.city !== 'undefined') && !validator.isEmpty(req.body.city))
                property.city = req.body.city;
            if ((typeof req.body.bedrooms !== 'undefined') && !validator.isInt(req.body.bedrooms,{$gte:1}))
                property.bedrooms = req.body.bedrooms;
            if ((typeof req.body.availableDate !== 'undefined') && validator.isAfter(req.body.availableDate))
                property.availableDate = req.body.availableDate;
            if ((typeof req.body.propertyState !== 'undefined') && !validator.isEmpty(req.body.propertyState))
                property.propertyState = req.body.propertyState;
            if ((typeof req.body.rooms !== 'undefined') && !validator.isInt(req.body.rooms,{$gte:1}))
                property.rooms = req.body.rooms;
            if ((typeof req.body.price !== 'undefined') && !validator.isInt(req.body.price,{$gte:1}))
                property.price = req.body.price;
            if ((typeof req.body.bathrooms !== 'undefined') && !validator.isInt(req.body.bathrooms,{$gte:1}))
                property.bathrooms = req.body.bathrooms;
            if ((typeof req.body.totalAreas !== 'undefined') && !validator.isInt(req.body.totalAreas,{$gte:1}))    //Add ur specified minimum and max are
                property.totalAreas = req.body.totalAreas;
            if ((typeof req.body.livingSpace !== 'undefined') && !validator.isInt(req.body.livingSpace,{$gte:1}))
                property.livingSpace = req.body.livingSpace;
            if ((typeof req.body.energyCertificate !== 'undefined') && !validator.isBoolean(req.body.energyCertificate))
                property.energyCertificate = req.body.energyCertificate;

            //Non Required alloction
            allocator(req,property);

            property.save(function (savePropertyError, savedProperty) {
                if (savePropertyError) {
                    console.log(savePropertyError);
                    res.status(500).json({
                        info: "Property Save Error",
                        error: savePropertyError
                    });
                } else {
                    res.status(200).json({
                        info: "Property Saved",
                        data: savedProperty
                    })
                }
            });
        }
    });
});

router.get('/delteProperty/:pid', function (req, res, next) {
    Property.findByIdAndRemove(req.params.pid, function (err) {
        if (err) {
            console.log(err);
            res.status(500).json({
                info: "Property Delete Error",
                error: err
            });
        } else {
            res.status(200).json({
                info: "Property Deleted"
            })
        }
    });
});


module.exports = router;