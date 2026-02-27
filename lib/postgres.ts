import { Pool } from 'pg'

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'abraham',
  password: 'admin123',
  database: 'my_simple_store',
})

export default pool
