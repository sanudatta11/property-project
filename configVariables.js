let express = require('express');
let router = express.Router();

router.variables = {
    bedroomsMin: 1,
    bathroomsMin: 1,
    roomsMin: 1,
    priceMin: 1,
    totalAreasMin: 1,
    livingSpaceMin: 1
};

module.exports = router;