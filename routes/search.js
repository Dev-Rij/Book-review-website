const {Router} = require('express')
const router = Router()

const {searchBooks} = require('../controllers/search')

router.get('/',searchBooks)

module.exports = router