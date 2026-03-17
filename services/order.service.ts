import boom from '@hapi/boom'

import sequelize from '../lib/sequelize.js'

const { models } = sequelize

type OrderType = {
  id: number
  customerId: number
  createdAt: Date
}

type CreateOrderType = Omit<OrderType, 'id' | 'createdAt'>

type UpdateOrderType = Partial<CreateOrderType>

export type ItemType = {
  id: number
  orderId: number
  productId: number
  amount: number
  createdAt: Date
}

type CreateItemType = Omit<ItemType, 'id' | 'createdAt'>

class OrderService {
  constructor() {}
  async create(data: CreateOrderType) {
    const newOrder = await models.Order.create(data)

    return newOrder
  }

  async addItem(data: CreateItemType) {
    const newItem = await models.OrderProduct.create(data)

    return newItem
  }

  async find() {
    const orders = await models.Order.findAll()

    return orders
  }

  async findOne(id: OrderType['id']) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    })

    return order
  }

  async update(id: OrderType['id'], changes: UpdateOrderType) {
    return {
      id,
      changes,
    }
  }

  async delete(id: OrderType['id']) {
    return { id }
  }
}

export default OrderService
