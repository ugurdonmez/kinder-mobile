
export class AttendanceModel {
   id: string
   parentId: string
   classId: string
   hereStatus: string
   day: string
   here: boolean
   comment: string

    public fromObject(obj: any):AttendanceModel {
        // this.id = obj.$key
        // this.studentId = obj.$key
        // this.hereStatus = obj.$value

        return this;
    }
}
