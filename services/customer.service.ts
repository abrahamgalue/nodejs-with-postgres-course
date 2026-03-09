import boom from '@hapi/boom'

import { Customer } from '../db/models/customer.model.js'

type CustomerType = {
  id: string
  name: string
  lastName: string
  phone?: string
  createdAt: Date
  userId: string
}

type CreateCustomerType = Omit<CustomerType, 'id' | 'createdAt'>

type UpdateCustomerType = Partial<CreateCustomerType>

class CustomerService {
  constructor() {}

  async create(data: CreateCustomerType) {
    try {
      const newCustomer = await Customer.create(data)

      return newCustomer
    } catch (e) {
      throw boom.badData('Please try later with property data')
    }
  }

  async find() {
    const customer = await Customer.findAll()

    return customer
  }

  async findOne(id: CustomerType['id']) {
    const customer = await Customer.findByPk(id)

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
