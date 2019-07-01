module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'tracker',
    user: process.env.DB_USER || 'tracker',
    password: process.env.DB_PASS || 'tracker',
    options: {
      dialect: process.env.dialect || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './tracker.sqlite'
    }
  },
  autentificacion: {
    jwtSecret: process.env.JWT_SECRET || 'secret'

  }
}
