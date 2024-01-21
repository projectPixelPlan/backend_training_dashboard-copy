import User from '../models/user'
import UserManager from '../models/userManager'
import UserRole from '../models/userRole'

const UserManagerJoin=()=>{
    User.hasOne(UserManager, {foreignKey: 'userId',});
  
    UserManager.belongsTo(User, {foreignKey: 'userId',});
}

const UserRoleJoin=()=>{
    User.hasOne(UserRole, {foreignKey: 'id',});
  
    UserManager.belongsTo(User, {foreignKey: 'idd',});
}

module.exports = UserManagerJoin;
module.exports = UserRoleJoin;