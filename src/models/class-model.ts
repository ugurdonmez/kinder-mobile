export class ClassModel {
    id: string;
    name: string;
    teacher_id: string;
    teacher_name: string;
    age: number;
    current: number;
    maximum: number;
    schoolId: string;
    attendance: any;
    gallery: any;
    homeworks: any;
    invitations: any;
    wall: any;
    wallRead: any;
    branchAdminId: string;
    schoolAdminId: string;

    public fromObject(obj: any):ClassModel {
        if(!!obj.$key){this.id = obj.$key;}
        else if(!!obj.id){this.id = obj.id;}
        this.name = obj.name;
        this.teacher_id = obj.teacher_id;
        this.age = obj.age;
        this.current = obj.current;
        this.maximum = obj.maximum;
        this.schoolId = obj.schoolId;
        this.branchAdminId = obj.branchAdminId;
        this.schoolAdminId = obj.schoolAdminId;
        if(!!obj.attendance){this.attendance = obj.attendance;}
        if(!!obj.teacher_name){this.teacher_name = obj.teacher_name;}
        if(!!obj.gallery){this.gallery = obj.gallery;}
        if(!!obj.homeworks){this.homeworks = obj.homeworks;}
        if(!!obj.invitations){this.invitations = obj.invitations;}
        if(!!obj.wall){this.wall = obj.wall;}
        if(!!obj.wallRead){this.wallRead = obj.wallRead;}
        return this;
    }
}
