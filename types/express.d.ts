interface QueryProduct {
  limit?: number
  offset?: number
  price?: number
  price_min?: number
  price_max?: number
}

declare global {
  namespace Express {
    interface Request {
      productQuery?: QueryProduct
    }
  }
}

export {}
