/*
    Event Routes
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/fieldValidators')
const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const isDate = require('../helpers/isDate');

const router = Router();

// JWT validation
router.use( validateJWT );


// Get events
router.get('/', getEvents);

// Get events
router.post(
    '/',
    [
        check('title', 'title is obligatory').not().isEmpty(),
        check('start', 'start date is required').custom( isDate ),
        check('end', 'end date is required').custom( isDate ),
        validateFields
    ],
     createEvent
);

// Get events
router.put(
    '/:id',
    [
        check('title', 'title is obligatory').not().isEmpty(),
        check('start', 'start date is required').custom( isDate ),
        check('end', 'end date is required').custom( isDate ),
        validateFields
    ], 
    updateEvent);

// Get events
router.delete('/:id', deleteEvent);


module.exports = router;