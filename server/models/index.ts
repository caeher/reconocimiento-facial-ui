import { User } from "./user.model";
import { Video } from "./video.model";
import { Attendance } from "./attendance.model";

// Relation between user and attendance (1-N)
User.hasMany(Video, {
    foreignKey: 'userid',
    as: 'videos'
});

// Relation between video and user (N-1)
Video.belongsTo(User, {
    foreignKey: 'userid',
    as: 'user'
});

// Relation between user and attendance (1-N)
User.hasMany(Attendance, {
    foreignKey: 'userid',
    as: 'attendances'
});

// Relation between attendance and user (N-1)
Attendance.belongsTo(User, {
    foreignKey: 'userid',
    as: 'user'
});

export {
    User,
    Video,
    Attendance
}