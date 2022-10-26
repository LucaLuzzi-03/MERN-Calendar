/*
    Auth routes
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();
const { validateFields } = require('../middlewares/fieldValidators');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');


router.post(
    '/new',
    [ // middlewares
        check('name', 'Name is obligatory').not().isEmpty(),
        check('email', 'Email is obligatory').isEmail(),
        check('password', 'Password should contain more than 6 digits').isLength({ min: 6 }),
        validateFields
    ], 
    createUser );

router.post(
    '/',
    [
        check('email', 'Email is obligatory').isEmail(),
        check('password', 'Password should contain more than 6 digits').isLength({ min: 6 }),
        validateFields
    ], 
    loginUser );


router.get('/renew', validateJWT, renewToken );



module.exports = router;