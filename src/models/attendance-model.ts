export class AttendanceModel {
    id: string;
    studentId: string;
    hereStatus: string;

    public fromObject(obj: any):AttendanceModel {
        this.id = obj.$key
        this.studentId = obj.$key
        this.hereStatus = obj.$value

        return this;
    }
}
