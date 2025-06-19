const swaggerJSDoc = require('swagger-jsdoc');
const YAML = require('yamljs'); // Precisa instalar: npm install yamljs
const path = require('path');

// OPÇÃO 1: Usar arquivo YAML separado
const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));

// OPÇÃO 2: Continuar com JSDoc (configuração atual)
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API CRUD com Swagger',
            version: '1.0.0',
            description: 'Documentação da API CRUD',
        },
    },
    apis: ['./src/routes/*.js'], // Lê os comentários JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

// Exportar conforme sua escolha:
module.exports = swaggerDocument; // Para YAML
// module.exports = swaggerSpec;   // Para JSDoc (atual)