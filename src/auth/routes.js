const { Router } = require('express');
const router = Router();
const controller = require('./controller')

router.post('/sign_in', controller.sign_in)
router.post('/sign_up', controller.sign_up)
router.get('/refresh_token', controller.refresh_token)

module.exports = router;