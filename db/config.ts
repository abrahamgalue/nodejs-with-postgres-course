import config from '../config/config.js'

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)

export default {
  development: {
    username: USER,
    password: PASSWORD,
    host: config.dbHost,
    port: config.dbPort,
    database: config.dbName,
    dialect: 'postgres',
  },
  production: {
    username: USER,
    password: PASSWORD,
    host: config.dbHost,
    port: config.dbPort,
    database: config.dbName,
    dialect: 'postgres',
  },
}
