const { Router } = require('express');
const temperamentRouter = require('./temperamentRouter');
const dogRouter = require('./dogRouter');

const router = Router();

router.use('/temperament', temperamentRouter);
router.use('/dog', dogRouter);

module.exports = router;