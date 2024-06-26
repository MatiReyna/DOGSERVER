const { Router } = require('express');
const temperamentRouter = require('./temperamentRouter');

const router = Router();

router.use('/temperament', temperamentRouter);

module.exports = router;