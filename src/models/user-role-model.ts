export class UserRoleModel {
    id: string;
    name: string;
    classId ?: string;
    schoolId ?: string;
    branchId ?: string;
    branchAdminId ? : string
    schoolAdminId ? : string

    public fromObject(obj: any):UserRoleModel {
        this.id = obj.$key
        this.name = obj.name
        this.classId = obj.classId
        this.schoolId = obj.schoolId
        this.branchId = obj.branchId
        this.branchAdminId = obj.branchAdminId
        this.schoolAdminId = obj.schoolAdminId

        return this;
    }
}
