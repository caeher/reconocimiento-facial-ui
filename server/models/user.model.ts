import { Model, DataTypes } from 'sequelize'
import { IUser } from '~/types/user'
import bcrypt from 'bcrypt'

export class User extends Model<IUser> {
  validPassword(password: string, hash: string) : boolean {
    return bcrypt.compareSync(password, hash);
  }
}

User.init({
  userid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ecode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {

  sequelize,
  modelName: 'user',
  
})

User.addHook('beforeCreate',  (user: IUser) => {
  console.log(user)
  // if (user.password) {
  //   console.log(user.password)
  //   const salt =  bcrypt.genSaltSync(10);
  //   user.password = bcrypt.hashSync(user.password, salt);
  // }
})

User.addHook('beforeUpdate',  (user:IUser) => {
  if (user.password) {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  }
})

