let express = require('express');
let router = express.Router();
let async = require('async');
let Property = require('../models/propertySchema');
let validationJS = require('../validators/validationJS');
let validator = require('validator');
let config = require('../configVariables');

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
    if ((typeof req.body.images !== 'undefined') && !Array.isArray(req.body.images) && !validator.isEmpty(req.body.images) && validator.isURL(req.body.images))
        property.images.push(req.body.images);
    console.log(Array.isArray(req.body.images));
    console.log(req.body.images);
    if ((typeof req.body.images !== 'undefined') && (Array.isArray(req.body.images)))
        {
            console.log("In");
            for(var i =0 ;i<req.body.images.length ; ++i)
                {
                    if (validator.isURL(req.body.images[i]))
                        property.images.push(req.body.images[i]);
                }
        }
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

    if ((typeof req.body.numberOfFloors !== 'undefined') && validator.isInt(req.body.numberOfFloors))
        property.numberOfFloors = parseInt(req.body.numberOfFloors);
    if ((typeof req.body.usableArea !== 'undefined') && validator.isInt(req.body.usableArea))
        property.usableArea = parseInt(req.body.usableArea);
    if ((typeof req.body.brokerFee !== 'undefined') && validator.isInt(req.body.brokerFee))
        property.brokerFee = parseInt(req.body.brokerFee);
    if ((typeof req.body.constructionYear !== 'undefined') && validator.isInt(req.body.constructionYear))
        property.constructionYear = parseInt(req.body.constructionYear);
    if ((typeof req.body.rentalYield !== 'undefined') && validator.isInt(req.body.rentalYield))
        property.rentalYield = parseInt(req.body.rentalYield);
    if ((typeof req.body.zipCode !== 'undefined') && validator.isInt(req.body.zipCode) && validator.isPostalCode(req.body.zipCode))
        property.zipCode = parseInt(req.body.zipCode);
    if ((typeof req.body.latitude !== 'undefined') && validator.isInt(req.body.latitude) && validator.isLatLong(req.body.latitude))
        property.latitude = parseInt(req.body.latitude);
    if ((typeof req.body.longitude !== 'undefined') && validator.isInt(req.body.longitude) && validator.isLatLong(req.body.longitude))
        property.longitude = parseInt(req.body.longitude);

    if ((typeof req.body.parkingSpace !== 'undefined') && validator.isBoolean(req.body.parkingSpace))
        property.parkingSpace = req.body.parkingSpace;
    if ((typeof req.body.garden !== 'undefined') && validator.isBoolean(req.body.garden))
        property.garden = req.body.garden;
    if ((typeof req.body.heating !== 'undefined') && validator.isBoolean(req.body.heating))
        property.heating = req.body.heating;
    if ((typeof req.body.balcony !== 'undefined') && validator.isBoolean(req.body.balcony))
        property.balcony = req.body.balcony;
    if ((typeof req.body.availability !== 'undefined') && validator.isBoolean(req.body.availability))
        property.availability = req.body.availability;
    if ((typeof req.body.guaranteedRentalYield !== 'undefined') && validator.isBoolean(req.body.guaranteedRentalYield))
        property.guaranteedRentalYield = req.body.guaranteedRentalYield;
    if ((typeof req.body.furnished !== 'undefined') && validator.isBoolean(req.body.furnished))
        property.furnished = req.body.furnished;
    if ((typeof req.body.storage !== 'undefined') && validator.isBoolean(req.body.storage))
        property.storage = req.body.storage;
    if ((typeof req.body.studio !== 'undefined') && validator.isBoolean(req.body.studio))
        property.studio = req.body.studio;
    if ((typeof req.body.financing !== 'undefined') && validator.isBoolean(req.body.financing))
        property.financing = req.body.financing;
};


router.get('/properties', function (req, res, next) {
    if (typeof req.query.filter !== 'undefined') {
        
        let bedroomsSelector = (req.query.bedrooms) ? "$in" : "$nin";
        let bedrooms = (req.query.bedrooms) ? [parseInt(req.query.bedrooms)] : [];
        let purchasePriceSelector = (req.query.purchasePrice) ? "$in" : "$nin";
        let purchasePrice = (req.query.purchasePrice) ? [parseInt(req.query.purchasePrice)] : [];
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
        let parkingSpaceChoice = [];
        if (typeof req.query.parkingSpace !== 'undefined') {
            if (req.query.parkingSpace == "true" || req.query.parkingSpace == true) {
                parkingSpaceChoice = [false];
            }
            else {
                parkingSpaceChoice = [true];
            }
        }
        console.log(parkingSpaceChoice, storageChoice, gardenChoice);
        async.waterfall([
            function (callback) {
                // console.log("enter into 1st");
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
                        $nin: parkingSpaceChoice
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
                    low: parseInt(req.query.budgetLow),
                    high: parseInt(req.query.budgetHigh),
                };
                let distanceRange = {
                    low: parseInt(req.query.distanceLow),
                    high: parseInt(req.query.distanceHigh)
                };
                let resultArray = [];
                for (let i = 0; i < data.length; ++i) {
                    let take = true;
                    console.log(data[i].price <= parseInt(budgetRange.high));
                    take = take && ((typeof req.query.budgetLow === 'undefined') || (data[i].price >= parseInt(budgetRange.low)));
                    take = take && ((typeof req.query.budgetHigh === 'undefined') || (data[i].price <= parseInt(budgetRange.high)));
                    take = take && ((typeof data[i].distanceToCityCenter === 'undefined') || (typeof req.query.distanceLow === 'undefined') || data[i].distanceToCityCenter >= parseInt(distanceRange.low));
                    take = take && ((typeof data[i].distanceToCityCenter === 'undefined') || (typeof req.query.distanceHigh === 'undefined') || data[i].distanceToCityCenter <= parseInt(distanceRange.high));
                    // console.log(data[i].distanceToCityCenter <= parseInt(distanceRange.high));

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
                    'info': 'No properties found  on specific filter'
                });
            }
            else {
                // console.log('done');
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
                livingSpace: parseInt(req.body.livingSpace),
                totalAreas: parseInt(req.body.totalAreas),
                rooms: parseInt(req.body.rooms),
                bedrooms: parseInt(req.body.bedrooms),
                bathrooms: parseInt(req.body.bathrooms),
                propertyState: req.body.propertyState,
                energyCertificate: req.body.energyCertificate,
                availableDate: req.body.availableDate,
                price: parseInt(req.body.price)
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
            var errors = [];
            if ((typeof req.body.title !== 'undefined') && !validator.isEmpty(req.body.title))
                property.title = req.body.title;
            if ((typeof req.body.city !== 'undefined') && !validator.isEmpty(req.body.city))
                property.city = req.body.city;
            if ((typeof req.body.bedrooms !== 'undefined'))
                {
                    if(!(parseInt(req.body.bedrooms)))
                        errors.push("Bedrooms cannot be zero!");
                    if((req.body.bedrooms - Math.floor(req.body.bedrooms)) !== 0)
                        errors.push("Bedrooms cannot be in decimal!");
                    property.bedrooms = parseInt(req.body.bedrooms);
                    console.log(errors);
                }

            if ((typeof req.body.availableDate !== 'undefined') && validator.isAfter(req.body.availableDate))
                property.availableDate = req.body.availableDate;
            if ((typeof req.body.propertyState !== 'undefined') && !validator.isEmpty(req.body.propertyState))
                property.propertyState = req.body.propertyState;
            
            if ((typeof req.body.rooms !== 'undefined')) {
                if (!(parseInt(req.body.rooms)))
                    errors.push("Rooms cannot be zero!");
                if ((req.body.rooms - Math.floor(req.body.rooms)) !== 0)
                    errors.push("Rooms cannot be in decimal!");
                property.rooms = parseInt(req.body.rooms);
            }
            if ((typeof req.body.price !== 'undefined')) {
                if (!(parseInt(req.body.price)))
                    errors.push("Price cannot be zero!");
                if ((req.body.price - Math.floor(req.body.price)) !== 0)
                    errors.push("Price cannot be in decimal!");
                property.price = parseInt(req.body.price);
            }
            if ((typeof req.body.bathrooms !== 'undefined')) {
                if (!(parseInt(req.body.bathrooms)))
                    errors.push("Bathrooms cannot be zero!");
                if ((req.body.bathrooms - Math.floor(req.body.bathrooms)) !== 0)
                    errors.push("Bathrooms cannot be in decimal!");
                property.bathrooms = parseInt(req.body.bathrooms);
            }
            if ((typeof req.body.totalAreas !== 'undefined')) {
                if (!(parseInt(req.body.totalAreas)))
                    errors.push("Total Areas cannot be zero!");
                if ((req.body.totalAreas - Math.floor(req.body.totalAreas)) !== 0)
                    errors.push("totalAreas cannot be in decimal!");
                property.totalAreas = parseInt(req.body.totalAreas);
            }
            if ((typeof req.body.livingSpace !== 'undefined')) {
                if (!(parseInt(req.body.livingSpace)))
                    errors.push("Living Space cannot be zero!");
                if ((req.body.livingSpace - Math.floor(req.body.livingSpace)) !== 0)
                    errors.push("livingSpace cannot be in decimal!");
                property.livingSpace = parseInt(req.body.livingSpace);
            }
            if ((typeof req.body.energyCertificate !== 'undefined') && validator.isBoolean(req.body.energyCertificate))
                property.energyCertificate = req.body.energyCertificate;

            //Non Required alloction
            allocator(req,property);
            if(errors.length)
            {
                res.status(400).json({
                    info: "Required attributes bad update!",
                    error: errors
                })
            }
            else{
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
            
        }
    });
});

router.get('/delteProperty/:pid', function (req, res, next) {
    async.waterfall([
        function (callback) {
            Property.findById(req.params.pid,function(err,data){
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);
                    } else if (!data) {
                        res.status(404).json({
                            "info": "Can't retrieve data on specific Id"
                        });
                    } else {
                        callback(null);
                    }
            });
        },
        function (callback) {
            Property.findByIdAndRemove(req.params.pid, function (err) {
                if (err) 
                    callback(err);
                else 
                    callback(null);
                
            });
        }
    ], function (err) {
        if(err)
            res.status(500).json({
                info: "Property Delete Error",
                error: err
            })
        else
            res.status(200).json({
                info: "Property Deleted"
            });
    });
});


module.exports = router;