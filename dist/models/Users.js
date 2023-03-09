"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
class User extends sequelize_1.Model {
    static findOneAndUpdate(phone) {
        throw new Error('Method not implemented.');
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        unique: true,
    },
    otp: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    otp_expiry: {
        type: sequelize_1.DataTypes.DATE,
    },
    is_registered: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    phone: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    grade: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    is_verified: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    tableName: 'users',
    sequelize: sequelize_2.default,
});
exports.default = User;
