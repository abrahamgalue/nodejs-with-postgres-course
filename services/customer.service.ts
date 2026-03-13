import boom from '@hapi/boom'

import sequelize from '../lib/sequelize.js'

const { models } = sequelize

type CustomerType = {
  id: number
  name: string
  lastName: string
  phone?: string
  createdAt: Date
  user: {
    email: string
    password: string
    role: string
  }
}

type CreateCustomerType = Omit<CustomerType, 'id' | 'createdAt'>

type UpdateCustomerType = Partial<CreateCustomerType>

class CustomerService {
  constructor() {}

  async create(data: CreateCustomerType) {
    try {
      const newCustomer = await models.Customer.create(data, {
        include: ['user'],
      })

      return newCustomer
    } catch (e) {
      throw boom.badData('Please try later with property data')
    }
  }

  async find() {
    const customer = await models.Customer.findAll({
      include: ['user'],
    })

    return customer
  }

  async findOne(id: CustomerType['id']) {
    const customer = await models.Customer.findByPk(id)

    if (!customer) throw boom.notFound('Customer not found')

    return customer
  }

  async update(id: CustomerType['id'], changes: UpdateCustomerType) {
    const customer = await this.findOne(id)

    const newCustomer = await customer.update(changes)

    return newCustomer
  }

  async delete(id: CustomerType['id']) {
    const customer = await this.findOne(id)

    await customer.destroy()

    return { id }
  }
}

export default CustomerService
