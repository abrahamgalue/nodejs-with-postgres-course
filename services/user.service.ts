import boom from '@hapi/boom'

import sequelize from '../lib/sequelize.js'

const { models } = sequelize

type UserType = {
  id: number
  email: string
  password: string
  role: string
}

type CreateUserType = Omit<UserType, 'id'>

type UpdateUserType = Partial<CreateUserType>

class UserService {
  constructor() {}

  async create(data: UserType) {
    const user = await models.User.create(data)

    return user
  }

  async find() {
    const data = await models.User.findAll({
      include: ['customer'],
    })

    return data
  }

  async findOne(id: UserType['id']) {
    const user = await models.User.findByPk(id)

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
