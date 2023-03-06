import { Sequelize } from 'sequelize';

const db_password = process.env.DB_PASSWORD || 'aakash'
const sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'auth',
  username: 'root',
  password: db_password,
  host: 'localhost',
  port: 3306,
  define: {
    timestamps: false,
    underscored: true,
  },
});

export default sequelize;
