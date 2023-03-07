import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class User extends Model {
    static findOneAndUpdate(phone: any) {
      throw new Error('Method not implemented.');
    }
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
  }

  User.init(
    {
      id: {                                                                                                                                                         
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      username:{
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
      }, 
      otp: {
        type: DataTypes.INTEGER,
        
      },
      otp_expiry : {
        type: DataTypes.DATE,
      },
      is_registered: {
        type: DataTypes.INTEGER,
        
      },
      phone: {
        type: DataTypes.BIGINT,
      },
      name: {
        type: DataTypes.STRING(255),
        
      },
      grade: {
        type: DataTypes.STRING(255),
        
      },
    
    },
    {
      tableName: 'users',
      sequelize,
    },
  );

  export default User;