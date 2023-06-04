import { Model, DataTypes } from 'sequelize'
import { IVideo } from '~/types/video'

export class Video extends Model<IVideo > {

}

Video.init({
    videoid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
  sequelize,
  modelName: 'video',
})

