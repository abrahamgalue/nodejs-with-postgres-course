import boom from '@hapi/boom'

import { User } from '../db/models/user.model.js'

type UserType = {
  id: string
  email: string
  password: string
  role: string
}

type CreateUserType = Omit<UserType, 'id'>

type UpdateUserType = Partial<CreateUserType>

class UserService {
  constructor() {}

  async create(data: UserType) {
    const user = await User.create(data)

    return user
  }

  async find() {
    const data = await User.findAll({
      include: ['customer'],
    })

    return data
  }

  async findOne(id: UserType['id']) {
    const user = await User.findByPk(id)

    if (!user) throw boom.notFound('User not found')

    return user
  }

  async update(id: UserType['id'], changes: UpdateUserType) {
    const user = await this.findOne(id)

    const newUser = await user.update(changes)

    return newUser
  }

  async delete(id: UserType['id']) {
    const user = await this.findOne(id)

    await user.destroy()

    return { id }
  }
}

export default UserService
