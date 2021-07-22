const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/links', require('./links'));
router.use('/', require('./usr'));

module.exports = router;