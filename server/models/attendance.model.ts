import { Model, DataTypes } from 'sequelize'
import { IAttendance } from '~/types/attendance'

export class Attendance extends Model<IAttendance > {

}

Attendance.init({
    attendanceid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    timein: {
        type: DataTypes.DATE,
        allowNull: true
    },
    timeout: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
  sequelize,
  modelName: 'attendance',
})

