const express = require('express')
const userRoutes = require('./src/routes/userRoutes')
// const authRoutes = require('./src/routes/authRoutes')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./src/config/swaggerConfig')


const app = express()
app.use(express.json())

// Rotas
app.use('/users', userRoutes)

// Rotas protegidas
// app.use('/auth', authRoutes)

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`)
    console.log('📚 Documentação Swagger: http://localhost:' + PORT + '/api-docs')
    console.log('🔗 API Base: http://localhost:' + PORT + '/users')
})

