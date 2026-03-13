import boom from '@hapi/boom'

import sequelize from '../lib/sequelize.js'

const { models } = sequelize

type CategoryType = {
  id: number
  name: string
  image: string
  createdAt: Date
}

type CreateCategoryType = Omit<CategoryType, 'id' | 'createdAt'>

type UpdateCategoryType = Partial<CreateCategoryType>

class CategoryService {
  constructor() {}

  async create(data: CreateCategoryType) {
    const newCategory = await models.Category.create(data)

    return newCategory
  }

  async find() {
    const categories = await models.Category.findAll()

    return categories
  }

  async findOne(id: CategoryType['id']) {
    const category = await models.Category.findByPk(id, { include: 'products' })

    return category
  }

  async update(id: CategoryType['id'], changes: UpdateCategoryType) {
    return {
      id,
      changes,
    }
  }

  async delete(id: CategoryType['id']) {
    return { id }
  }
}

export default CategoryService
