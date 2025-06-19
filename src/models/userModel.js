const fs = require('fs').promises
const path = require('path')
const EmailHelper = require('../utils/EmailHelper')

const refencePath = path.join(__dirname, '../../data/userData.json')

class Crud {
    constructor(filePath) {
        this.filePath = filePath || refencePath
    }

    async getAllUsers() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8')
            return JSON.parse(data);
        } catch (error) {
            // Se o arquivo não existe ou está vazio, retorna array vazio
            return [];
        }
    }

    async createUser(user) {
        try {
            // 1️⃣ Validações básicas
            if (!user.name || !user.email) {
                throw new Error("Nome e email são obrigatórios");
            }

            if (!user.name.trim()) {
                throw new Error("Nome não pode estar vazio");
            }

            // 2️⃣ Validar formato do email usando o helper
            if (!EmailHelper.isValidFormat(user.email)) {
                throw new Error("Formato de email inválido");
            }

            // 3️⃣ Verificar se email já existe usando o helper
            const emailExists = await EmailHelper.emailExists(user.email)

            if (emailExists) throw new Error("Email já está em uso");

            const users = await this.getAllUsers()

            // 4️⃣ Proteção contra IDs não numéricos
            const lastId = users.length > 0 ? Math.max(...users.map(u => parseInt(u.id) || 0)) : 0
            const newId = (lastId + 1).toString().padStart(2, '0')

            // 5️⃣ Criar usuário com dados normalizados
            const newUser = { 
                id: newId, 
                name: user.name.trim(), // Remove espaços extras
                email: EmailHelper.normalize(user.email), // Normaliza email
                createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
            }

            users.push(newUser)
            await fs.writeFile(this.filePath, JSON.stringify(users, null, 2))
            console.log(`Usuário criado com sucesso: ${JSON.stringify(newUser)}`)

            return newUser

        } catch (error) {
            console.error(`Erro ao criar usuário: ${error.message}`)
            throw error // Re-throw para o controller tratar
        }
    }

    // Método para buscar usuário por ID
    async getUserById(id) {
        try {
            const users = await this.getAllUsers()
            const user = users.find(user => user.id === id)
            
            // Opcional: lançar erro se usuário não encontrado
            // if (!user) {
            //     throw new Error("Usuário não encontrado")
            // }
            console.log(user)
            return user // Retorna undefined se não encontrar
        } catch (error) {
            console.error(`Erro ao buscar usuário: ${error.message}`)
            throw error
        }
    }

    // Método para atualizar usuário
    async updateUser(id, updates) {
        try {
            // 1️⃣ Validações básicas
            if (!updates.name && !updates.email) {
                throw new Error("Pelo menos um campo (name ou email) deve ser fornecido")
            }

            if (updates.name !== undefined && !updates.name.trim()) {
                throw new Error("Nome não pode estar vazio")
            }

            // 2️⃣ Validar email se fornecido
            if (updates.email) {
                if (!EmailHelper.isValidFormat(updates.email)) {
                    throw new Error("Formato de email inválido")
                }

                // Verificar se email já existe (excluindo o usuário atual)
                const emailExists = await EmailHelper.emailExists(updates.email, id)
                if (emailExists) {
                    throw new Error("Email já está em uso")
                }
            }

            const users = await this.getAllUsers()
            const userIndex = users.findIndex(user => user.id === id)
            
            if (userIndex === -1) {
                throw new Error("Usuário não encontrado")
            }

            // 3️⃣ Preparar dados normalizados
            const normalizedUpdates = {}
            if (updates.name) normalizedUpdates.name = updates.name.trim()
            if (updates.email) normalizedUpdates.email = EmailHelper.normalize(updates.email)

            // 4️⃣ Atualizar usuário
            users[userIndex] = { 
                ...users[userIndex], 
                ...normalizedUpdates, 
                updatedAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
            }

            await fs.writeFile(this.filePath, JSON.stringify(users, null, 2))
            console.log(`Usuário atualizado: ${JSON.stringify(users[userIndex])}`)
            
            return users[userIndex]

        } catch (error) {
            console.error(`Erro ao atualizar usuário: ${error.message}`)
            throw error
        }
    }

    async deleteUserById(id) {
        try {
            const users = await this.getAllUsers()
            const userIndex = users.findIndex(user => user.id === id)

            if (userIndex === -1) {
                throw new Error("Usuário não encontrado")
            }

            const deletedUser = users.splice(userIndex, 1)[0]
            await fs.writeFile(this.filePath, JSON.stringify(users, null, 2))
            console.log(`Usuário deletado: ${JSON.stringify(deletedUser)}`)

            return deletedUser

        } catch (error) {
            console.error(`Erro ao deletar usuário: ${error.message}`)
            throw error
        }
    }
}

module.exports = Crud

// Teste
// const user = {
//     "name": "Mathaus",
//     "email": "mathauscarvalho@gmail.com"
// }

async function main() {
    const manager = new Crud()
    // await manager.createUser(user)
    // await manager.getAllUsers()
    // await manager.getUserById("06")
    // await manager.updateUser("06", { name: "Luiz Silva" }) 
    // await manager.updateUser("06", { email: "luizsilva@email.com" }) 
}

main()