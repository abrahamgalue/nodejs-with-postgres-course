import { type Sequelize } from 'sequelize'
import { UserSchema, User } from './user.model.js'

function setupModels(sequelize: Sequelize) {
  User.init(UserSchema, User.config(sequelize))
}

export default setupModels
