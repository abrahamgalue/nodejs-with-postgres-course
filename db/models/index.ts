import { type Sequelize } from 'sequelize'
import { UserSchema, User } from './user.model.js'
import { CustomerSchema, Customer } from './customer.model.js'

function setupModels(sequelize: Sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))

  User.associate(sequelize.models)
  Customer.associate(sequelize.models)
}

export default setupModels
