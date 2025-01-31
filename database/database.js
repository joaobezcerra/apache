const sequelize = require('sequelize')
const Sequelize = require('sequelize')
const connection = new Sequelize('guiapress', 'root', 'root', {
    host: 'localhost', 
    port: 8889,
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection