import {
  Model,
  DataTypes,
  type Sequelize,
  type ModelStatic,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from 'sequelize'
import { CATEGORY_TABLE } from './category.model.js'

export const PRODUCT_TABLE = 'products'

export const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'category_id',
    references: {
      model: CATEGORY_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
}

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare image: string
  declare createdAt: CreationOptional<Date>
  declare categoryId: number

  static associate(models: Record<string, ModelStatic<any>>) {
    this.belongsTo(models.Category, { as: 'category' })
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    }
  }
}
