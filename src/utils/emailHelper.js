const fs = require('fs').promises
const path = require('path')

class EmailHelper {

    static async emailExists(email, excludId = null, filePath = null) {

        try {
            const dataPath = filePath || path.join(__dirname, '../../data/userData.json')

            const data = await fs.readFile(dataPath, 'utf-8')
            const users = JSON.parse(data)

            return users.some(user => {
                if (excludId && user.id === excludId) return false

                return user.email.toLowerCase() === email.toLowerCase().trim()
            })

        } catch (error) {
            if(error.code === 'ENOENT') return false

            console.error('Erro ao verificar email: ', error)
            throw error
        }

    }

    static isValidFormat(email) {
        if (!email || typeof email !== 'string') return false

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email.trim())
    }

    static normalize(email) {
        return email.toLowerCase().trim()
    }

}

module.exports = EmailHelper