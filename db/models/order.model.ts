import {
  Model,
  DataTypes,
  type Sequelize,
  type ModelStatic,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type NonAttribute,
} from 'sequelize'
import { CUSTOMER_TABLE } from './customer.model.js'
import { type ProductType } from '../../services/products.service.js'
import { type ItemType } from '../../services/order.service.js'

type Items = ProductType & { OrderProduct: ItemType }

export const ORDER_TABLE = 'orders'

export const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customerId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'customer_id',
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
  },
  total: {
    type: DataTypes.VIRTUAL,
    get(this: Order) {
      if (this.items && this.items.length > 0) {
        return this.items.reduce(
          (total, item) => total + item.price * item.OrderProduct.amount,
          0,
        )
      }

      return 0
    },
  },
}

export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  declare id: CreationOptional<number>
  declare customerId: number
  declare createdAt: CreationOptional<Date>

  declare items: NonAttribute<Items[]>
  declare total: NonAttribute<number>

  static associate(models: Record<string, ModelStatic<any>>) {
    this.belongsTo(models.Customer, {
      as: 'customer',
      foreignKey: 'customerId',
    })
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    })
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    }
  }
}
