const EmailHelper = require('../utils/EmailHelper')
const PasswordHelper = require('../utils/PasswordHelper')

class UserValidator {
    // Validação completa para criação de usuário
    static validateCreate(userData) {
        if (!userData || typeof userData !== 'object')
            throw new Error ("Dados do usuário são obrigatorios")

        // Campos obrigatórios
        if (!userData.name || !userData.email || !userData.password) {
            throw new Error ("Nome, email e senha são obrigatórios")
        }

        // Validações individuais
        this.validateName(userData.name)
        this.validateEmail(userData.email)
        this.validetePassword(userData.password)
    }

    // Validação para atualização (campos opcionais)
    static valideUpdate(userData) {
        if (!userData || typeof userData !== 'object') {
            throw new Error("Dados para atualização são obrigatórios")
        }

        // Pelo menos um campo deve ser fornecido
        if (!userData.name && !userData.email && !userData.password) {
            throw new Error("Pelo menos um campo (nome, email ou senha) deve ser fornecido")
        }
        
        // Validar campos fornecidos
        if (userData.name !== undefined) {
            this.validateName(userData.name)
        }

        if (userData.email !== undefined) {
            this.validateEmail(userData.email)
        }

        if (userData.password !== undefined) {
            this.validatePassword(userData.password)
        }

    }

    // Validação específica de nome
    static validateName(name) {
        if (typeof name !== 'string') {
            throw new Error ("Nome deve ser uma string")
        }

        if(!name.trim()) {
            throw new Error("nome não poed estar vazio")
        }

    }
    // validação específica de Email
    static validateEmail(email) {

    }
    // Validação específica de senha
    static validatePassword(password) {

    }
    // Validação de ID
    static validateId(id) {

    }
    // Sanitização de dados de entrada
    static sanitizeInput(usarData) {

    }
}

module.exports = UserValidator