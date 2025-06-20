const UserValidator = require('../validators/UserValidator')
const PasswordHelper = require('../utils/PasswordHelper')

class UserService {
    constructor(userRepository) {
        this.repository = userRepository
    }

    async getAllUsers() {
        try {
            const users = await this.repository.getAllUsers()
            console.log(` 📋 Retornando ${users.length} usuários`)
            return users

        } catch (error) {
            console.error(` ❌ Erro ao buscar usuários: ${error.message}`)
            throw error
        }
    }

    async findById(id) {
        try {
            UserValidator.validateId(id)

            const user = await this.repository.findById(id)
            if (!user) {
                throw new Error("Usuário não encontrado")
            }

            console.log(` 🔍 Usuário encontrado: ID ${id}`)
            return user

        } catch (error) {
            console.error(` ❌ Erro ao buscar usuário: ${error.message}`)
            throw error
        }

    }

    async findByEmail(email) {
        try {
            UserValidator.validateEmail(email)

            const normalizedEmail = email.toLowerCase().trim()
            const user = await this.repository.findByEmail(normalizedEmail)

            if (!email) {
                throw new Error("Email não contrado")
            }

            return user

        } catch (error) {
            console.error(`❌ Erro ao buscar usuário por email: ${error.message}`)
            throw error
        }
    }

    async emailExists(email, excludeId = null) {
        try {
            UserValidator.validateEmail(email)
            return await this.repository.emailExists(email, excludeId)

        } catch (error) {
            console.error(` ❌ Erro ao verificar email: ${error.message}`)            
        }
    }

    async createUser(userData) {
        try {
            // 1 - Validar dados de entrada
            UserValidator.validateCreate(userData)

            // 2 - Sanitizar dados
            const sanitizedData = UserValidator.sanitizeInput(userData)

            // 3 - Verificar se o email já existe
            const emailExists = await this.repository.findByEmail(sanitizedData.email)
            if (emailExists) {
                throw new Error("Email já está em uso")
            }

            // 4 - Criptografar senha
            const hashPassword = await PasswordHelper.hashPasswordAsync(sanitizedData.password)

            // 5 - Criar objeto do usuário com senha criptografada
            const userToCreate = {
                name: sanitizedData.name,
                email: sanitizedData.email,
                password: hashPassword
            }

            // 6 - Salvar no repositório
            const savedUser = await this.repository.createUser(userToCreate)

            console.log(` ✅ Usuário criado com sucesso: ID ${savedUser.id}`)
            return savedUser

        } catch (error) {
            console.error(` ❌ Erro ao criar usuário: ${error.message}`)
            throw error
        }

    }

    async updateUser(id, updates) {
        try {
            // 1 - validar ID e dados
            UserValidator.validateId(id)
            UserValidator.valideUpdate(updates)

            // 2 - Verificar se usuário existe
            const existingUser = await this.repository.findById(id)
            if(!existingUser) {
                throw new Error("Usuário não econtrado")
            }

            // 3 - Sanitizar dados
            const sanitizedUpdates = UserValidator.sanitizeInput(updates)
            
            // 4 - Verificar email único (se fornecido)
            if (sanitizedUpdates.email) {
                const emailExists = await this.repository.emailExists(sanitizedUpdates)
                if (emailExists) {
                    throw new Error("Email já em uso");
                }
            }

            // 5 - Criptografar senha (se fornecida) async
            if (sanitizedUpdates.password) {
                sanitizedUpdates.password = PasswordHelper.hashPasswordAsync(sanitizedUpdates)
            }

            // 6 - Atualizar no repositório
            const updateUser = await this.repository.update(id, sanitizedUpdates)
            console.log(`✏️ Usuário atualizado com sucesso: ID ${id}`)
            return updatedUser

        } catch (error) {
            console.error(`❌ Erro ao atualizar usuário: ${error.message}`)
            throw error
        }

    }

    async deleteUserById(id) {
        try {
            UserValidator.validateId(id)

            const deletedUser = await this.repository.deleteUser(id)
            console.log(` 🗑️ Usuário removido com sucesso: ID ${id}`)
            return deletedUser

        } catch (error) {
            console.error(` ❌ Erro ao remover usuário: ${error.message}`)
            throw error
        }
    }

    async coutUsers() {
        try {
            const count = await this.repository.coutUsers()
            console.log(` 📊 Total de usuários: ${count}`)
            
            return count

        } catch (error) {
            console.error(` ❌ Erro ao contar usuários: ${error.message}`)
            throw error
        }
    }

    async findPaginated(page = 1, limit = 10) {
        try {
            if (page < 1) page = 1
            if (limit < 1 || limit > 100) limit = 10
            
            const result = await this.repository.findPaginated(page, limit)
            console.log(`📋 Página ${page}: ${result.users.length} de ${result.total} usuários`)
            
            return result

        } catch (error) {
            console.error(` ❌ Erro ao buscar usuários paginados: ${error.message}`)
            throw error
        }
    }

    async authenticateUser(email, password){
        try {
            UserValidator.validateEmail(email)

            const user = await this.repository.findByEmail(email)
            if (!user) {
                throw new Error("Credenciais inválidas")                
            }

            // Verifica se o usuário tem senha (caso tenha sido criado sem senha)
            if (!user.password) {
                throw new Error("Usuário sem senha configurada")
            }

            // Comparar senhas
            const isPasswordValid = PasswordHelper.comparePasswordAsync(password, user.password)
            if (!isPasswordValid) {
                throw new Error("Credenciais inválidas")                
            }
            
            console.log(`🔐 Usuário autenticado: ${email}`)
            
            return user

        } catch (error) {
            console.error(` ❌ Erro na autenticação: ${error.message}`)
            throw error
        }
    }
}

module.exports = UserService