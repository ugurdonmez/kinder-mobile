export class TeacherModel {
    id: string;
    name: string;
    surname: string;
    notes: string;
    profileImageUrl: string;
    schoolId: string;

    public fromObject(obj: any):TeacherModel {
        this.id = obj.id
        this.name = obj.name
        this.surname = obj.surname
        this.notes = obj.notes
        this.profileImageUrl = obj.profileImageUrl
        this.schoolId = obj.schoolId

        return this;
    }
}
