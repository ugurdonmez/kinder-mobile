export class UserModel {
    id: string;
    email: string;
    role: string;
    classId ?: string;
    schoolId ?: string;
    branchId ?: string;
    branchAdminId ? : string
    schoolAdminId ? : string
    roles ?: any

    public fromObject(obj: any, email:string):UserModel {
        this.id = obj.$key
        this.email = email
        this.role = obj.role
        this.classId = obj.classId
        this.schoolId = obj.schoolId
        this.branchId = obj.branchId
        this.branchAdminId = obj.branchAdminId
        this.schoolAdminId = obj.schoolAdminId
        this.roles = obj.roles

        return this;
    }
}
