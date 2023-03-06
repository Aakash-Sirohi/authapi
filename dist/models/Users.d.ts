import { Model } from 'sequelize';
declare class User extends Model {
    static findOneAndUpdate(phone: any): void;
    id: number;
    name: string;
    email: string;
    password: string;
}
export default User;
