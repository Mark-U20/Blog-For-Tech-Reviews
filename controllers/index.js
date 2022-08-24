const router = require('express').Router();
const guestRoutes = require('./guestRoutes');
const authRoutes = require('./api/authRoutes');

router.use('/', guestRoutes);
router.use('/auth', authRoutes);

module.exports = router;
