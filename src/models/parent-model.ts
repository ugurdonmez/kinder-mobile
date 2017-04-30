export class ParentModel {
    id: string;
    classId: string
    parentName: string
    parentSurname: string
    parentTelephone: string
    profileImageUrl: string
    studentAddress: string
    studentBirthDate: string
    studentName: string
    studentSurname: string

    public fromObject(obj: any):ParentModel {
        this.id = obj.id;
        this.classId = obj.classId
        this.parentName = obj.parentName
        this.parentSurname = obj.parentSurname
        this.parentTelephone = obj.parentTelephone
        this.profileImageUrl = obj.profileImageUrl
        this.studentAddress = obj.studentAddress
        this.studentBirthDate = obj.studentBirthDate
        this.studentName = obj.studentName
        this.studentSurname = obj.studentSurname

        return this;
    }
}
