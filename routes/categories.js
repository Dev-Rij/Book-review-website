const { Router } = require("express")

const router = Router()

const {renderCategories} = require('../controllers/categories')

router.get('/',renderCategories)

module.exports = router