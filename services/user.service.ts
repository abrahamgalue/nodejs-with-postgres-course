import boom from '@hapi/boom'

import { User } from '../db/models/user.model.js'

class UserService {
  constructor() {}

  async create(data) {
    const user = await User.create(data)

    return user
  }

  async find() {
    const data = await User.findAll()

    return data
  }

  async findOne(id) {
    const user = await User.findByPk(id)

    if (!user) throw boom.notFound('User not found')

    return user
  }

  async update(id, changes) {
    const user = await this.findOne(id)

    const newUser = await user.update(changes)

    return newUser
  }

  async delete(id) {
    const user = await this.findOne(id)

    await user.destroy()

    return { id }
  }
}

export default UserService
