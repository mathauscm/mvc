const fs = require('fs').promises
const path = require('path')

class UserRepository {
    constructor(filePath) {
        this.filePath = filePath || path.join(__dirname, '../../data/userData.json')
    }

    async getAllUsers() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8')
            return JSON.parse(data)

        } catch (error) {
            return []
        }
    }

    async findById(id) {
        const users = await this.getAllUsers()
        return users.find(user => user.id === id)

    }

    async findByEmail(email) {
        const user = await this.getAllUsers()
        return user.find(user => user.email.toLowerCase() === email.toLowerCase()) || null

    }

    async saveAll(users) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(users, null, 2))
            return true

        } catch (error) {
            throw new Error(`Erro ao salvar usuários: ${error.message}`)
        }
    }

    async createUser(userData) {
        const users = await this.getAllUsers()

        // Gera novo ID
        const lastId = users.length > 0 ? Math.max(...users.map(u => parseInt(u.id) || 0)) : 0
        const newId = (lastId + 1).toString().padStart(2, '0')

        const newUser = {
            id: newId,
            ...userData,
            createdAt: new Date().toLocaleDateString('pt-br', { timeZone: 'America/Sao_Paulo' })
        }

        users.push(newUser)
        await this.saveAll(users)

        return newUser
    }

    async updateUser(id, updates) {
        const users = await this.getAllUsers()
        const userIndex = users.findIndex(user => user.id === id)

        if (userIndex === -1) {
            throw new Error("Usuário não encontrado")
        }

        const updateUser = {
            ...users[userIndex],
            ...updates,
            updatedAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        }

        users[userIndex] = updateUser
        await this.saveAll(users)

        return updateUser
    }

    async deleteUserById(id) {
        const users = await this.getAllUsers()
        const userIndex = users.findIndex(user => user.id === id)

        if (userIndex === -1) {
            // erro de persistencia tratados aqui
            // erros de negocio tratados no service
            throw new Error("Usuário não encontrado")
        }

        const deletedUser = users.splice(userIndex, 1)[0]
        await this.saveAll(deletedUser)

        return deletedUser
    }

    async countUsers() {
        const users = await this.getAllUsers()
        return users.length
    }

    async findPaginated(page = 1, limit = 10) {
        const users = await this.getAllUsers()
        const startIndex = (page - 1) * limit
        const endIdex = startIndex + limit

        return {
            users: users.slice(startIndex, endIdex),
            total: users.length,
            page,
            limit,
            totalPages: Math.ceil(users.length / limit)
        }
    }



}

module.exports = UserRepository