import { Model } from 'sequelize';
declare class User extends Model {
    id: number;
    name: string;
    email: string;
    password: string;
}
export default User;
