import { type Sequelize } from 'sequelize'
import { UserSchema, User } from './user.model.js'
import { CustomerSchema, Customer } from './customer.model.js'
import { Category, CategorySchema } from './category.model.js'
import { Product, ProductSchema } from './product.model.js'
import { Order, OrderSchema } from './order.model.js'
import { OrderProductSchema, OrderProdut } from './order-product.model.js'

function setupModels(sequelize: Sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))
  Category.init(CategorySchema, Category.config(sequelize))
  Product.init(ProductSchema, Product.config(sequelize))
  Order.init(OrderSchema, Order.config(sequelize))
  OrderProdut.init(OrderProductSchema, OrderProdut.config(sequelize))

  User.associate(sequelize.models)
  Customer.associate(sequelize.models)
  Category.associate(sequelize.models)
  Product.associate(sequelize.models)
  Order.associate(sequelize.models)
}

export default setupModels
