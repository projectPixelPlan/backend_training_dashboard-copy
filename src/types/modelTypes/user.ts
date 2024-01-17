import { Model } from "sequelize";
import sequelize from "../../config/sequelize";



class User extends Model{

    public id?: string;
    public ssoId!: string;
    public employeeId!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public jobTitle!: string;
    public department!: string;
    public isActive!: boolean;
    public createdAt?: Date;
    public updatedAt?: Date;
    }
    
export default User