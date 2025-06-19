const Crud = require('../models/userModel')

const userCrud = new Crud()

// POST /users - Criar novo usuário
const addUser = async (req, res) => {
    try {
        // 🎯 Simplesmente delega para o model - ele faz todas as validações
        const newUser = await userCrud.createUser(req.body)
        return res.status(201).json(newUser)
        
    } catch (error) {
        // 🚨 Apenas trata os erros que vêm do model
        
        // Erros de validação (400 - Bad Request)
        if (error.message.includes('obrigatórios') || 
            error.message.includes('vazio') || 
            error.message.includes('inválido') ||
            error.message.includes('fornecido')) {
            return res.status(400).json({ error: error.message })
        }
        
        // Erros de conflito (409 - Conflict)
        if (error.message.includes('já está em uso') || 
            error.message.includes('já cadastrado')) {
            return res.status(409).json({ error: error.message })
        }
        
        // Erro interno (500)
        console.error('Erro interno:', error)
        return res.status(500).json({ error: 'Erro interno do servidor' })
    }
}

// GET /users - Listar todos os usuários
const listUsers = async (req, res) => {
    try {
        const users = await userCrud.getAllUsers()
        res.json(users)
    } catch (error) {
        console.error('Erro ao listar usuários:', error)
        res.status(500).json({ error: 'Erro ao buscar usuários' })
    }
}

// GET /users/:id - Buscar usuário por ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userCrud.getUserById(id)
        
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }
        
        res.json(user)
    } catch (error) {
        console.error('Erro ao buscar usuário:', error)
        res.status(500).json({ error: 'Erro ao buscar usuário' })
    }
}

// PUT /users/:id - Atualizar usuário
const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const updatedUser = await userCrud.updateUser(id, req.body)
        res.json(updatedUser)
        
    } catch (error) {
        // Erros de validação (400)
        if (error.message.includes('obrigatórios') || 
            error.message.includes('vazio') || 
            error.message.includes('inválido') ||
            error.message.includes('fornecido')) {
            return res.status(400).json({ error: error.message })
        }
        
        // Usuário não encontrado (404)
        if (error.message === 'Usuário não encontrado') {
            return res.status(404).json({ error: error.message })
        }
        
        // Email duplicado (409)
        if (error.message.includes('já está em uso')) {
            return res.status(409).json({ error: error.message })
        }
        
        console.error('Erro ao atualizar usuário:', error)
        return res.status(500).json({ error: 'Erro interno do servidor' })
    }
}

// DELETE /users/:id - Deletar usuário
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params
        const deletedUser = await userCrud.deleteUserById(id)
        res.json(deletedUser)
        
    } catch (error) {
        if (error.message === 'Usuário não encontrado') {
            return res.status(404).json({ error: error.message })
        }
        
        console.error('Erro ao deletar usuário:', error)
        res.status(500).json({ error: 'Erro ao deletar usuário' })
    }
}

module.exports = {
    listUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUserById
}


// Teste
// const user = {
//     "name": "Mathaus",
//     "email": "mathauscarvalho@gmail.com"
// }

// async function main() {
//     // Mock do objeto req (requisição)
//     const req = {
//         body: user,
//         params: { id: "01" } // Para testes de GET/PUT/DELETE
//     }
    
//     // Mock do objeto res (resposta)
//     const res = {
//         status: function(code) {
//             console.log(`Status: ${code}`)
//             return this // Permite encadeamento
//         },
//         json: function(data) {
//             console.log(`Response:`, JSON.stringify(data, null, 2))
//             return this
//         }
//     }
    
//     try {
//         console.log('🧪 Testando addUser...')
//         await addUser(req, res)
        
//         console.log('\n🧪 Testando listUsers...')
//         await listUsers(req, res)
        
//         console.log('\n🧪 Testando getUserById...')
//         await getUserById(req, res)
        
//         console.log('\n🧪 Testando updateUser...')
//         req.body = { name: "Mathaus Atualizado" }
//         await updateUser(req, res)
        
//     } catch (error) {
//         console.log('❌ Erro no teste:', error.message)
//     }
// }

// main()