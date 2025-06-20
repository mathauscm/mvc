const bcrypt = require('bcryptjs');

class PasswordHelper {

    // Gera hash da senha de forma síncrona (mais rápido para a aplicação)
    static hashPassword(password) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    // Versão assíncrona do hash (caso precise)
    static async hashPasswordAsync(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    // Valida força da senha com regex
    static validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    }

    // Compara senha com hash de forma síncrona
    static comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }

    // Versão assíncrona da comparação (caso precise)
    static async comparePasswordAsync(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    // Método helper para validar se uma senha atende aos critérios
    static getPasswordRequirements() {
        return {
            minLength: 8,
            requireLowercase: true,
            requireUppercase: true, 
            requireNumber: true,
            requireSpecialChar: true,
            message: "Senha deve ter pelo menos 8 caracteres, incluindo: 1 minúscula, 1 maiúscula, 1 número e 1 caractere especial"
        };
    }

    // Método para obter detalhes de quais critérios não foram atendidos
    static getPasswordValidationDetails(password) {
        const checks = {
            minLength: password.length >= 8,
            hasLowercase: /[a-z]/.test(password),
            hasUppercase: /[A-Z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[\W_]/.test(password)
        };

        const failures = [];
        if (!checks.minLength) failures.push("pelo menos 8 caracteres");
        if (!checks.hasLowercase) failures.push("1 letra minúscula");
        if (!checks.hasUppercase) failures.push("1 letra maiúscula");
        if (!checks.hasNumber) failures.push("1 número");
        if (!checks.hasSpecialChar) failures.push("1 caractere especial");

        return {
            isValid: Object.values(checks).every(Boolean),
            checks,
            failures,
            message: failures.length > 0 ? `Senha deve conter: ${failures.join(', ')}` : "Senha válida"
        };
    }
}

module.exports = PasswordHelper