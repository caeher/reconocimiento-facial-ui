export interface IAttendance {
    attendanceid?: number;
    userid?: number;
    date: Date;
    timein: Date;
    timeout: Date;
    createdAt?: Date;
    updatedAt?: Date;
}