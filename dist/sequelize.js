"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_password = process.env.DB_PASSWORD || 'aakash';
const sequelize = new sequelize_1.Sequelize({
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
exports.default = sequelize;
