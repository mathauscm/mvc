const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

// POST /users - Criar novo usuário
router.post('/', UserController.addUser)

// GET /users - Listar todos os usuários
router.get('/', UserController.listUsers)

// GET /users/:id - Buscar usuário por ID
router.get('/:id', UserController.getUserById)

// PUT /users/:id - Atualizar usuário
router.put('/:id', UserController.updateUser)

// DELETE /users/:id - Deletar usuário por ID
router.delete('/:id', UserController.deleteUserById)

module.exports = router