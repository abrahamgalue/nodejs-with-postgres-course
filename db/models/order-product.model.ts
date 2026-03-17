import {
  Model,
  DataTypes,
  type Sequelize,
  type ModelStatic,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from 'sequelize'
import { ORDER_TABLE } from './order.model.js'
import { PRODUCT_TABLE } from './product.model.js'

export const ORDER_PRODUCT_TABLE = 'orders_products'

export const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  orderId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'order_id',
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  productId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'product_id',
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
}

export class OrderProdut extends Model<
  InferAttributes<OrderProdut>,
  InferCreationAttributes<OrderProdut>
> {
  declare id: CreationOptional<number>
  declare createdAt: CreationOptional<Date>
  declare orderId: number
  declare productId: number

  static associate(models: Record<string, ModelStatic<any>>) {}

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false,
    }
  }
}
