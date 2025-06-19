const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')
const UserController = require('../controllers/userController')

// Rotas protegidas
router.get('/', authMiddleware, UserController.listUsers)
router.put('/:id', authMiddleware, UserController.updateUser)

// Rotas públicas (sem middleware)
router.post('/register', UserController.register) // implementar

module.exports = router