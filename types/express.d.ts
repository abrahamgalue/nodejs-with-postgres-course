interface QueryProduct {
  limit?: number
  offset?: number
}

declare global {
  namespace Express {
    interface Request {
      productQuery?: QueryProduct
    }
  }
}

export {}
